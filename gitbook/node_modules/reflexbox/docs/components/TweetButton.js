
import React from 'react'
import { withReflex } from '../../src'

const script = `
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");
`

const TweetButton = ({ text, url, via, ...props }) => (
  <div {...props}>
    <div style={{ height: 20 }}>
      <a href='https://twitter.com/share'
        className='twitter-share-button'
        data-text={text}
        data-url={url}
        data-via={via}
        children='Tweet' />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  </div>
)

TweetButton.defaultProps = {
  text: '',
  url: 'http://jxnblk.com/reflexbox',
  via: 'jxnblk'
}

export default withReflex()(TweetButton)

