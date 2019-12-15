/*
 A Succinct Trie for Javascript

 By Steve Hanov
 Released to the public domain.

 This file contains functions for creating a succinctly encoded trie structure
 from a list of words. The trie is encoded to a succinct bit string using the
 method of Jacobson (1989). The bitstring is then encoded using BASE-64. 
 
 The resulting trie does not have to be decoded to be used. This file also
 contains functions for looking up a word in the BASE-64 encoded data, in
 O(mlogn) time, where m is the number of letters in the target word, and n is
 the number of nodes in the trie.

 Objects for encoding:

 TrieNode
 Trie
 BitWriter

 Objects for decoding:
 BitString
 FrozenTrieNode
 FrozenTrie

 QUICK USAGE:

 Suppose we let data be some output of the demo encoder:

 var data = {
    "nodeCount": 37,
    "directory": "BMIg",
    "trie": "v2qqqqqqqpIUn4A5JZyBZ4ggCKh55ZZgBA5ZZd5vIEl1wx8g8A"
 };

 var frozenTrie = new FrozenTrie( Data.trie, Data.directory, Data.nodeCount);

 alert( frozenTrie.lookup( "hello" ) ); // outputs true
 alert( frozenTrie.lookup( "kwijibo" ) ); // outputs false

*/   

// Configure the bit writing and reading functions to work natively in BASE-64 
// encoding. That way, we don't have to convert back and forth to bytes.

var BASE64 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";


/**
    The width of each unit of the encoding, in bits. Here we use 6, for base-64
    encoding.
 */
var W = 6;

/**
    Returns the character unit that represents the given value. If this were
    binary data, we would simply return id.
 */
function CHR(id) 
{
    return BASE64[id];
}

/** 
    Returns the decimal value of the given character unit.
 */

var BASE64_CACHE = {"A" : 0, "B" : 1, "C" : 2, "D" : 3, "E" : 4, "F" : 5, "G" :
    6, "H" : 7, "I" : 8, "J" : 9, "K" : 10, "L" : 11, "M" : 12, "N" : 13, "O" :
    14, "P" : 15, "Q" : 16, "R" : 17, "S" : 18, "T" : 19, "U" : 20, "V" :
    21, "W" : 22, "X" : 23, "Y" : 24, "Z" : 25, "a" : 26, "b" : 27, "c" :
    28, "d" : 29, "e" : 30, "f" : 31, "g" : 32, "h" : 33, "i" : 34, "j" :
    35, "k" : 36, "l" : 37, "m" : 38, "n" : 39, "o" : 40, "p" : 41, "q" :
    42, "r" : 43, "s" : 44, "t" : 45, "u" : 46, "v" : 47, "w" : 48, "x" :
    49, "y" : 50, "z" : 51, "0" : 52, "1" : 53, "2" : 54, "3" : 55, "4" :
    56, "5" : 57, "6" : 58, "7" : 59, "8" : 60, "9" : 61, "-" : 62, "_" :
    63};

function ORD(ch) 
{
    // Used to be: return BASE64.indexOf(ch);
    return BASE64_CACHE[ch];
}

/**
    Fixed values for the L1 and L2 table sizes in the Rank Directory
*/
var L1 = 32*32;
var L2 = 32;

/**
    The BitWriter will create a stream of bytes, letting you write a certain
    number of bits at a time. This is part of the encoder, so it is not
    optimized for memory or speed.
*/
function BitWriter()
{
    this.init();
}

BitWriter.prototype = 
{
    init: function() {
        this.bits = [];
    },

    /**
        Write some data to the bit string. The number of bits must be 32 or
        fewer.
    */
    write: function( data, numBits ) {
        for( var i = numBits - 1; i >= 0; i-- ) {
            if ( data & ( 1 << i ) ) {
                this.bits.push(1);
            } else {
                this.bits.push(0);
            }
        }
    },

    /**
        Get the bitstring represented as a javascript string of bytes
    */
    getData: function() {
        var chars = [];
        var b = 0;
        var i = 0;

        for ( var j = 0; j < this.bits.length; j++ ) {
            b = ( b << 1 ) | this.bits[j];
            i += 1;
            if ( i === W ) {
                chars.push( CHR(b) );
                i = b = 0;
            }
        }

        if ( i ) {
            chars.push( CHR(b << ( W - i )) );
        }

        return chars.join("");
    },

    /**
        Returns the bits as a human readable binary string for debugging
     */
    getDebugString: function(group) {
        var chars = [];
        var i = 0;
        
        for( var j = 0; j < this.bits.length; j++ ) {
            chars.push( "" + this.bits[j] );
            i++;
            if ( i === group ) {
                chars.push( ' ' );
                i = 0;
            }
        }

        return chars.join("");
    }
};

/**
    Given a string of data (eg, in BASE-64), the BitString class supports
    reading or counting a number of bits from an arbitrary position in the
    string.
*/
function BitString( str )
{
    this.init( str );
}

BitString.MaskTop = [ 
    0x3f, 0x1f, 0x0f, 0x07, 0x03, 0x01, 0x00 
];

BitString.BitsInByte = [ 
    0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2,
    3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3,
    3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3,
    4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4,
    3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5,
    6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4,
    4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5,
    6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5,
    3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3,
    4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6,
    6, 7, 6, 7, 7, 8 
];


BitString.prototype = {
    init: function( str ) {
        this.bytes = str;
        this.length = this.bytes.length * W;
    },

    /**
      Returns the internal string of bytes
    */
    getData: function() {
        return this.bytes;
    },

    /**
        Returns a decimal number, consisting of a certain number, n, of bits
        starting at a certain position, p.
     */
    get: function( p, n ) {

        // case 1: bits lie within the given byte
        if ( ( p % W ) + n <= W ) {
            return ( ORD( this.bytes[ p / W | 0 ] ) & BitString.MaskTop[ p % W ] ) >> 
                ( W - p % W - n );

        // case 2: bits lie incompletely in the given byte
        } else {
            var result = ( ORD( this.bytes[ p / W | 0 ] ) & 
                BitString.MaskTop[ p % W ] );

            var l = W - p % W;
            p += l;
            n -= l;

            while ( n >= W ) {
                result = (result << W) | ORD( this.bytes[ p / W | 0 ] );
                p += W;
                n -= W;
            }

            if ( n > 0 ) {
                result = (result << n) | ( ORD( this.bytes[ p / W | 0 ] ) >> 
                    ( W - n ) );
            }

            return result;
        }
    },

    /**
        Counts the number of bits set to 1 starting at position p and
        ending at position p + n
     */
    count: function( p, n ) {

        var count = 0;
        while( n >= 8 ) {
            count += BitString.BitsInByte[ this.get( p, 8 ) ];
            p += 8;
            n -= 8;
        }

        return count + BitString.BitsInByte[ this.get( p, n ) ];
    },

    /**
        Returns the number of bits set to 1 up to and including position x.
        This is the slow implementation used for testing.
    */
    rank: function( x ) {
        var rank = 0;
        for( var i = 0; i <= x; i++ ) {
            if ( this.get(i, 1) ) {
                rank++;
            }
        }

        return rank;
    }
};

/**
    The rank directory allows you to build an index to quickly compute the
    rank() and select() functions. The index can itself be encoded as a binary
    string.
 */
function RankDirectory( directoryData, bitData, numBits, l1Size, l2Size )
{
    this.init(directoryData, bitData, numBits, l1Size, l2Size);
}

/**
    Used to build a rank directory from the given input string.

    @param data A javascript string containing the data, as readable using the
    BitString object.

    @param numBits The number of bits to index.
    
    @param l1Size The number of bits that each entry in the Level 1 table
    summarizes. This should be a multiple of l2Size.

    @param l2Size The number of bits that each entry in the Level 2 table
    summarizes.
 */
RankDirectory.Create = function( data, numBits, l1Size, l2Size ) {
    var bits = new BitString( data );
    var p = 0;
    var i = 0;
    var count1 = 0, count2 = 0;
    var l1bits = Math.ceil( Math.log( numBits ) / Math.log(2) );
    var l2bits = Math.ceil( Math.log( l1Size ) / Math.log(2) );

    var directory = new BitWriter();

    while( p + l2Size <= numBits ) {
        count2 += bits.count( p, l2Size );
        i += l2Size;
        p += l2Size;
        if ( i === l1Size ) {
            count1 += count2;
            directory.write( count1, l1bits );
            count2 = 0;
            i = 0;
        } else {
            directory.write( count2, l2bits );
        }
    }

    return new RankDirectory( directory.getData(), data, numBits, l1Size, l2Size );
};


RankDirectory.prototype = {

    init: function( directoryData, bitData, numBits, l1Size, l2Size ) {
        this.directory = new BitString( directoryData );
        this.data = new BitString( bitData );
        this.l1Size = l1Size;
        this.l2Size = l2Size;
        this.l1Bits = Math.ceil( Math.log( numBits ) / Math.log( 2 ) );
        this.l2Bits = Math.ceil( Math.log( l1Size ) / Math.log( 2 ) );
        this.sectionBits = (l1Size / l2Size - 1) * this.l2Bits + this.l1Bits;
        this.numBits = numBits;
    },

    /**
        Returns the string representation of the directory.
     */
    getData: function() {
        return this.directory.getData();
    },

    /**
      Returns the number of 1 or 0 bits (depending on the "which" parameter) to
      to and including position x.
      */
    rank: function( which, x ) {

        if ( which === 0 ) {
            return x - this.rank( 1, x ) + 1;
        }

        var rank = 0;              
        var o = x;
        var sectionPos = 0;

        if ( o >= this.l1Size ) {
            sectionPos = ( o / this.l1Size | 0 ) * this.sectionBits;
            rank = this.directory.get( sectionPos - this.l1Bits, this.l1Bits );
            o = o % this.l1Size;
        }

        if ( o >= this.l2Size ) {
            sectionPos += ( o / this.l2Size | 0 ) * this.l2Bits;
            rank += this.directory.get( sectionPos - this.l2Bits, this.l2Bits );
        }

        rank += this.data.count( x - x % this.l2Size, x % this.l2Size + 1 );

        return rank;
    },

    /**
      Returns the position of the y'th 0 or 1 bit, depending on the "which"
      parameter.
      */
    select: function( which, y ) {
        var high = this.numBits;
        var low = -1;
        var val = -1;

        while ( high - low > 1 ) {
            var probe = (high + low) / 2 | 0;
            var r = this.rank( which, probe );

            if ( r === y ) {
                // We have to continue searching after we have found it,
                // because we want the _first_ occurrence.
                val = probe;
                high = probe;
            } else if ( r < y ) {
                low = probe;
            } else {
                high = probe;
            }
        }

        return val;
    }
};

/**
  A Trie node, for use in building the encoding trie. This is not needed for
  the decoder.
  */
function TrieNode( letter )
{
    this.letter = letter;
    this.final = false;
    this.children = [];
}

function Trie()
{
    this.init();
}

Trie.prototype = {
    init: function() {
        this.previousWord = "";
        this.root = new TrieNode(' ');
        this.cache = [ this.root ];
        this.nodeCount = 1;
    },

    /**
      Returns the number of nodes in the trie
     */
    getNodeCount: function() {
        return this.nodeCount;
    },

    /**
      Inserts a word into the trie. This function is fastest if the words are
      inserted in alphabetical order.
     */
    insert: function( word ) {      

        var commonPrefix = 0;
        for( var i = 0; i < Math.min( word.length, this.previousWord.length );
                i++ )
        {
            if ( word[i] !== this.previousWord[i] ) { break; }
            commonPrefix += 1;
        }

        this.cache.length = commonPrefix + 1;
        var node = this.cache[ this.cache.length - 1 ];

        for( i = commonPrefix; i < word.length; i++ ) {
            var next = new TrieNode( word[i] );
            this.nodeCount++;
            node.children.push( next );
            this.cache.push( next );
            node = next;
        }

        node.final = true;
        this.previousWord = word;
    },

    /**
      Apply a function to each node, traversing the trie in level order.
      */
    apply: function( fn ) 
    {
        var level = [ this.root ];
        while( level.length > 0 ) {
            var node = level.shift();
            for( var i = 0; i < node.children.length; i++ ) {
                level.push( node.children[i] );
            }
            fn( node );
        }

    },

    /**
      Encode the trie and all of its nodes. Returns a string representing the
      encoded data.
      */
    encode: function()
    {
        // Write the unary encoding of the tree in level order.
        var bits = new BitWriter();
        bits.write( 0x02, 2 );
        this.apply( function( node ) {
            for( var i = 0; i < node.children.length; i++ ) {
                bits.write( 1, 1 );
            }
            bits.write( 0, 1 );
        });

        // Write the data for each node, using 6 bits for node. 1 bit stores
        // the "final" indicator. The other 5 bits store one of the 26 letters
        // of the alphabet.
        var a = ("a").charCodeAt(0);
        this.apply( function( node ) {
            var value = node.letter.charCodeAt(0) - a;
            if ( node.final ) {
                value |= 0x20;
            }

            bits.write( value, 6 );
        });

        return bits.getData();
    }
};

/**
  This class is used for traversing the succinctly encoded trie.
  */
function FrozenTrieNode( trie, index, letter, final, firstChild, childCount )
{
    this.trie = trie;
    this.index = index;
    this.letter = letter;
    this.final = final;
    this.firstChild = firstChild;
    this.childCount = childCount;
}

FrozenTrieNode.prototype = {
    /**
      Returns the number of children.
      */
    getChildCount: function()
    {
        return this.childCount;
    },

    /**
      Returns the FrozenTrieNode for the given child.

      @param index The 0-based index of the child of this node. For example, if
      the node has 5 children, and you wanted the 0th one, pass in 0.
    */
    getChild: function(index) 
    {
        return this.trie.getNodeByIndex( this.firstChild + index );
    }
};

/**
    The FrozenTrie is used for looking up words in the encoded trie.

    @param data A string representing the encoded trie.

    @param directoryData A string representing the RankDirectory. The global L1
    and L2 constants are used to determine the L1Size and L2size.

    @param nodeCount The number of nodes in the trie.
  */
function FrozenTrie( data, directoryData, nodeCount )
{
    this.init( data, directoryData, nodeCount );
}

FrozenTrie.prototype = {
    init: function( data, directoryData, nodeCount )
    {
        this.data = new BitString( data );
        this.directory = new RankDirectory( directoryData, data, 
                nodeCount * 2 + 1, L1, L2 );

        // The position of the first bit of the data in 0th node. In non-root
        // nodes, this would contain 6-bit letters.
        this.letterStart = nodeCount * 2 + 1;
    },

    /**
       Retrieve the FrozenTrieNode of the trie, given its index in level-order.
       This is a private function that you don't have to use.
      */
    getNodeByIndex: function( index )
    {
        // retrieve the 6-bit letter.
        var final = this.data.get( this.letterStart + index * 6, 1 ) === 1;
        var letter = String.fromCharCode(
                this.data.get( this.letterStart + index * 6 + 1, 5 ) + 
                'a'.charCodeAt(0));
        var firstChild = this.directory.select( 0, index+1 ) - index;

        // Since the nodes are in level order, this nodes children must go up
        // until the next node's children start.
        var childOfNextNode = this.directory.select( 0, index + 2 ) - index - 1;

        return new FrozenTrieNode( this, index, letter, final, firstChild,
                childOfNextNode - firstChild );
    },

    /**
      Retrieve the root node. You can use this node to obtain all of the other
      nodes in the trie.
      */
    getRoot: function()
    {
        return this.getNodeByIndex( 0 );
    },

    /**
      Look-up a word in the trie. Returns true if and only if the word exists
      in the trie.
      */
    lookup: function( word ) 
    {
        var node = this.getRoot();
        for ( var i = 0; i < word.length; i++ ) {
            var child;
            var j = 0;
            for ( ; j < node.getChildCount(); j++ ) {
                child = node.getChild( j );
                if ( child.letter === word[i] ) {
                    break;
                }
            }

            if ( j === node.getChildCount() ) {
                return false;
            }
            node = child;
        }

        return node.final;
    }
};

/**************************************************************************************************
  DEMONSTATION APPLICATION FUNCTIONS
  *************************************************************************************************/

/**
  Load a dictionary asynchronously.
  */
function loadDictionary() 
{
    var xmlHttpReq;
    try {
       xmlHttpReq = new XMLHttpRequest();
    } catch ( trymicrosoft ) {
        try {
            xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(othermicrosoft) {
            try {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(failed) {
                xmlHttpReq = null;
            }
        }
    }

    strUrl = "ospd3.txt";

    xmlHttpReq.open("GET", "ospd3.txt", true);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState === 4) {
            if (xmlHttpReq.status === 200 ) {
                document.getElementById("input").value =
                    xmlHttpReq.responseText;
            } else if ( xmlHttpReq.message ) {
                alert( xmlHttpReq.message );
            } else {
                alert( "Network error. Check internet connection" );
            }
        }
    };

    xmlHttpReq.send("");
}

/**
  Encode the trie in the input text box.
  */
function go()
{
    // create a trie
    var trie = new Trie();

    // split the words of the input up. Sort them for faster trie insertion.
    var words = document.getElementById("input").value.split(/\s+/);
    words.sort();
    var regex = /^[a-z]+$/;
    for ( var i = 0; i < words.length; i++ ) {
        // To save space, our encoding handles only the letters a-z. Ignore
        // words that contain other characters.
        var word = words[i].toLowerCase();
        if ( word.match( /^[a-z]+$/ ) ) {
            trie.insert( word );
        }

    }

    // Encode the trie.
    var trieData = trie.encode();

    // Encode the rank directory
    var directory = RankDirectory.Create( trieData, trie.getNodeCount() * 2 +
            1, L1, L2 );
    var output;
    
    output = '{\n    "nodeCount": ' + trie.getNodeCount() + ",\n";
    
    output += '    "directory": "' + directory.getData() + '",\n';
    
    output += '    "trie": "' + trieData + '"\n';
    output += "}\n";

    document.getElementById("output").value = output;

    document.getElementById("encodeStatus").innerHTML = 
        "Encoded " + document.getElementById("input").value.length + 
        " bytes to " + output.length + " bytes.";

}

/**
  Decode the data in the output textarea, and use it to check if a word exists
  in the dictionary.
  */
function lookup()
{
    var status = "";
    try 
    {
        var json = eval( '(' + document.getElementById("output").value + ")" );
        var ftrie = new FrozenTrie( json.trie, json.directory, json.nodeCount
                );
        var word = document.getElementById("lookup").value;
        if ( ftrie.lookup( document.getElementById("lookup").value ) ) {
            status = '"' + word + "' is in the dictionary.";
        } else {
            status = '"' + word + "' IS NOT in the dictionary.";
        }
    } catch ( e ) {
        status = "Error. Have you encoded the dictionary yet?";
    }

    document.getElementById("status").innerHTML = status;

}

