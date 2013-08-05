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

  $('.coin-select-btn').click(function () {
    var coin_type = $(this).attr('id');
    displayAddress(coin_type);
  });
};
