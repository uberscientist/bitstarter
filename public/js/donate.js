$.ready = function() {

  var displayAddress = function(coin_type) {
    var name = $('#donater-name').val() || 'Anonymous';
    var email = $('#donater-email').val() || '';
    var amount = $('#donate-amount').val() || '0.1';

    $.get('/donate-api/address/' + coin_type + '/' + name, function(data) {

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

  }

  // Donation request
  $('.coin-select-btn').click(function () {
    var coin_type = $(this).attr('id');
    displayAddress(coin_type);
  });

  // Display the backer ranks when clicked
  $('#backers-link').click(displayDonations);
};
