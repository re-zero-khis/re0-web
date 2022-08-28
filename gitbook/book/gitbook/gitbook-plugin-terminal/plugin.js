require(['gitbook', 'jQuery'], function(gitbook, $) {

  const TERMINAL_HOOK = '**[terminal]'

  var pluginConfig = {};
  var regex = /\*\*\[(command|delimiter|error|path|prompt|warning) ((?:[^\]]+|\](?!\*\*|$)|)+)]/
  var timeouts = {};

  function addCopyButtons(block) {
    block.find('span.t-command').each(function(index) {
      command = $(this).attr('data-command', index + 1);
      line = command.parent();
      line.closest('pre').append(
        $('<i class="fa fa-clone t-copy"></i>')
          .attr('data-command', index + 1)
          .click(function() {
            copyCommand($(this));
          })
          .css({ top: line.position().top + 'px' })
      );
    });
  }

  function addCopyTextarea() {

    /* Add also the text area that will allow to copy */
    $('body').append('<textarea id="t-textarea" />');
  }

  function copyCommand(button) {
    pre = button.parent();
    command = pre.find('span.t-command[data-command=' + button.attr('data-command') + ']');
    textarea = $('#t-textarea');
    textarea.val(command.text());
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    command.focus();
    updateCopyButton(button);
  }

  function initializePlugin(config) {
    pluginConfig = config.terminal;
  }

  function format_terminal_block(block) {
    pre = block.parent('pre')
    pre.addClass('terminal t-' + pluginConfig.style);

    if (pluginConfig.fade) {
      pre.addClass('t-fade');
    }

    /* Remove hook and parse text */
    text = block.html().replace(TERMINAL_HOOK, '');
    text = parse_lines(text);
    text = parse_tokens(text);

    /* Update block text */
    block.html(text);

    /* Remove extra lines after parsing*/
    remove_extra_lines(block);

    /* Mark prompt lines */
    block.find('span.t-command').parent('span.t-line').addClass('t-prompt-line');

    if (pluginConfig.copyButtons) {

      /*
       * Add copy buttons once the document is ready. Otherwise the
       * value for lines' top position will be wrong.
       */
      $(document).ready(function() {
        addCopyButtons(block);
      });
    }
  }

  function parse_lines(text) {
    output = '';
    open_tag = true;

    for (let line of text.split('\n')) {
      line = line + '\n'; // Preserve break lines for the regex to work
      output += open_tag? '<span class="t-line">' + line : line;
      open_tag = line.endsWith('\\\n')? false : output += '</span>', true
    }

    return output;
  }

  function parse_tokens(text) {
    return text.replace(new RegExp(regex, 'gm'), function(match, token, value) {
      return '<span class="t-' + token + '">' + value + '</span>';
    });
  }

  function remove_extra_lines(block) {
    $(block).children('span').each(function() {
      return remove_if_empty($(this));
    });

    remove_if_empty($('span', block).last())
  }

  function remove_if_empty(element) {
    removed = false;

    if (!$.trim(element.html())) {
      element.remove();
      removed = true;
    }

    return removed;
  }

  function updateCopyButton(button) {
    id = button.attr('data-command');
    button.removeClass('fa-clone').addClass('fa-check');

    // Clear timeout
    if (id in timeouts) {
      clearTimeout(timeouts[id]);
    }
    timeouts[id] = window.setTimeout(function() {
      button.removeClass('fa-check').addClass('fa-clone');
    }, 1000);
  }

  gitbook.events.bind('start', function(e, config) {
    initializePlugin(config);

    if (pluginConfig.copyButtons) {
      addCopyTextarea();
    }
  });

  gitbook.events.bind('page.change', function() {
    $('code:contains(' + TERMINAL_HOOK + ')').each(function() {
      format_terminal_block($(this));
    });
  });

});
