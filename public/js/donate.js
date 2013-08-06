// Yoinked out of sugar.js
var escapeHTML = function(string) {
  return string.replace(/&/g, '&amp;' )
              .replace(/</g, '&lt;' )
              .replace(/>/g, '&gt;' )
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;')
              .replace(/\//g, '&#x2f;');
}

$.ready = function() {

  var displayAddress = function(coin_type) {
    var name = $('#donater-name').val() || 'Anonymous';
    var email = $('#donater-email').val() || '';
    var amount = $('#donate-amount').val() || '0.1';

    var donation_data = {
      name: name, 
      email: email,
      amount: amount,
      type: coin_type
    };

    $.post('/donate-api/address/', donation_data, function(data) {

      if(!data.error) {
        $('#address').html(data.address);
        $('#qr-code').attr('src', data.qr).fadeIn();
        $('#address-container').fadeIn();
        $('.hide-after-donate').fadeOut();
        $('.modal-title').html('Thank you ' + data.name + '!');
        $('#address-link').attr('href', coin_type + '://' + data.address + "?amount=" + amount);
      }

    });
  }

  var displayDonations = function() {
    $.get('/donate-api/donations', function(donations) {
      var btc = donations[0];
      var ltc = donations[1];

      var ltc_list = "<ul>"
      var btc_list = "<ul>"

      for(var i = 0; i < btc.length; i+=2) {
        var name = escapeHTML(btc[i]);
        var amount = btc[i+1];
        btc_list += "<li>" + name + " : " + "&#3647;" + amount + "</li>";
      }
      btc_list += "</ul>";

      for(var i = 0; i < ltc.length; i+=2) {
        var name = escapeHTML(ltc[i]);
        var amount = ltc[i+1];
        ltc_list += "<li>" + name + " : " + "&#3647;" + amount + "</li>";
      }
      ltc_list += "</ul>";

      $('#btc-donators').html(btc_list);
      $('#ltc-donators').html(ltc_list);
    });
  }

  var getTotals = function() {
    $.get('/donate-api/totals', function(totals) {
      $('#total-btc').html(totals[0] || '0.0');
      $('#total-ltc').html(totals[1] || '0.0');

      var donator_count = totals[2] + totals[3];
      $('#backers-count').html(donator_count);
    });
  }

  // Donation request
  $('.coin-select-btn').click(function () {
    var coin_type = $(this).attr('id');
    displayAddress(coin_type);
  });

  // Display the backer ranks when clicked
  $('#backers-link').click(displayDonations);

  // Display totals for btc/ltc when page loads
  getTotals();
};
