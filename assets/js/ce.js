$(document).ready(function() {
    $('#lnkMail').on('click mouseover', function(){
        var bway = $(this).attr('href').toString();
        if(bway.indexOf("mailto") < 0){
            var newHref = bway.split("").reverse().join("");
            $(this).attr('href', newHref);
        }
    });
    return false;
});

if(window.location.hash) {
  var hash = window.location.hash;
  var nohash = window.location.href.replace(/#.*$/, '');
  window.history.replaceState('', document.title, nohash)  
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 90
  }, 500, 'swing');
} 

function ce_refresh(tt,value) {
    $("#ce_status_loading").show();
    $("#ce_gateway_send,#ce_gateway_receive,#ce_amount_send,#ce_amount_receive,#ce_exbtn").prop("disabled",true);
    $("#ce_exchange_rate,#ce_reserve_text").html("<i class='fa fa-spin fa-spinner'></i>");
    $("#ce_status").html("");
    if(tt == "1") {
        ce_load_receive_list(value);
        ce_load_img(1);
        ce_load_rate();
    } else if(tt == "2") {
        ce_load_rate();
        ce_load_img(2);
    } else {
        return true;
    }
    
}

function ce_load_rate() {
    var from = $("#ce_gateway_send").val();
    var to = $("#ce_gateway_receive").val();
    var url = $("#wurl").val();
    var data_url = url + "app/requests/load.php?a=rate&from="+from+"&to="+to;
	$.ajax({
		type: "GET",
		url: data_url,
		dataType: "json",
		success: function (data) {
            if(data.status == "success") {
                var exchange_rate = data.rate_from+' '+data.currency_from+' = '+data.rate_to+' '+data.currency_to;
                var reserve = data.reserve+' '+data.currency_to;
                $("#ce_exchange_rate").html(exchange_rate);
                $("#ce_reserve_text").html(reserve);
                $("#ce_amount_send").val(data.rate_from);
                $("#ce_amount_send2").val(data.rate_from);
                $("#ce_amount_receive").val(data.rate_to);
                $("#ce_amount_receive2").val(data.rate_to);
                $("#ce_rate_from").val(data.rate_from);
                $("#ce_rate_to").val(data.rate_to);
                $("#ce_currency_from").val(data.currency_from);
                $("#ce_currency_to").val(data.currency_to);
                $("#ce_reserve").val(data.reserve);
                $("#ce_sic1").val(data.sic1);
                $("#ce_sic2").val(data.sic2);
                $("#ce_gateway_send,#ce_gateway_receive,#ce_amount_send,#ce_amount_receive,#ce_exbtn").prop("disabled",false);
                $("#ce_status_loading").hide();
            }
        }
    });
}

function ce_load_rate2() {
    var from = $("#ce_gateway_send").val();
    var to = $("#ce_gateway_receive").val();
    var url = $("#wurl").val();
    var data_url = url + "app/requests/load.php?a=rate&from="+from+"&to="+to;
	$.ajax({
		type: "GET",
		url: data_url,
		dataType: "json",
		success: function (data) {
            if(data.status == "success") {
                var exchange_rate = data.rate_from+' '+data.currency_from+' = '+data.rate_to+' '+data.currency_to;
                var reserve = data.reserve+' '+data.currency_to;
                $("#ce_exchange_rate").html(exchange_rate);
                $("#ce_reserve_text").html(reserve);
                $("#ce_rate_from").val(data.rate_from);
                $("#ce_rate_to").val(data.rate_to);
                $("#ce_currency_from").val(data.currency_from);
                $("#ce_currency_to").val(data.currency_to);
                $("#ce_reserve").val(data.reserve);
                $("#ce_sic1").val(data.sic1);
                $("#ce_sic2").val(data.sic2);
                ce_calculator(1);
                $("#exrateupdate").hide();
            } else {
                alert(data.msg);
            }
		}
    });
}

function ce_load_receive_list(value) {
    var url = $("#wurl").val();
    var data_url = url + "app/requests/load.php?a=receive_list&id="+value;
	$.ajax({
		type: "GET",
		url: data_url,
		dataType: "json",
		success: function (data) {
            if(data.status == "success") {
                $("#ce_gateway_receive").html(data.content);
                ce_load_img(2);
                ce_load_rate();
            } else {
                alert(data.msg);
            }
		}
	});
}

function ce_load_img(tt) {
    if(tt == "1") {
        var url = $("#wurl").val();
        var gtid = $("#ce_gateway_send").val();
        var data_url = url + "app/requests/load.php?a=img&id="+gtid;
        $.ajax({
            type: "GET",
            url: data_url,
            dataType: "json",
            success: function (data) {
                if(data.status == "success") {
                    $("#ce_send_img").attr("src",data.content);;
                } else {
                    alert(data.msg);
                }
            }
        });
    } else if(tt == "2") {
        var url = $("#wurl").val();
        var gtid = $("#ce_gateway_receive").val();
        var data_url = url + "app/requests/load.php?a=img&id="+gtid;
        $.ajax({
            type: "GET",
            url: data_url,
            dataType: "json",
            success: function (data) {
                if(data.status == "success") {
                    $("#ce_receive_img").attr("src",data.content);;
                } else {
                    alert(data.msg);
                }
            }
        });
    } else {
        return true;
    }
}

function ce_calculator(type) {
        var currency_from = parseFloat($("#ce_currency_from").val());
        var currency_to = parseFloat($("#ce_currency_to").val());
        var rate_from = parseFloat($("#ce_rate_from").val());
        var rate_to = parseFloat($("#ce_rate_to").val());
        var sic1 = parseFloat($("#ce_sic1").val());
        var sic2 = parseFloat($("#ce_sic2").val());
        var amount_send = parseFloat($("#ce_amount_send").val());
        var amount_receive = parseFloat($("#ce_amount_receive").val());
        
    if(type == "1") {
        if(isNaN(amount_send)) {
            var sum = 0;
        } else {
            var sum = amount_send * (rate_to / rate_from)
        }
        
        if(sic2 == "1") {
             var data = sum.toFixed(8);
        } else {
             var data = sum.toFixed(2);
        }
        $("#ce_amount_send2").val(amount_send);
        $("#ce_amount_receive").val(data);
        $("#ce_amount_receive2").val(data);
    } else if(type == "2") {
        if(isNaN(amount_receive)) {
            var sum = 0;
        } else {
            var sum = amount_receive * (rate_from / rate_to)
        }
        
        if(sic2 == "1") {
             var data = sum.toFixed(8);
        } else {
             var data = sum.toFixed(2);
        }
        $("#ce_amount_receive2").val(amount_receive);
        $("#ce_amount_send").val(data);
        $("#ce_amount_send2").val(data);
    } else {
        return false;
    }
}

function ce_exchange(formID) {
    $("#ce_status").html("");
    $("#ce_status_loading").show();
    var url = $("#wurl").val();
	var data_url = url + "app/requests/exchange.php?a=prepare";
	$.ajax({
		type: "POST",
		url: data_url,
		data: $(formID).serialize(),
		dataType: "json",
		success: function (data) {
            $("#ce_status_loading").hide();
			if(data.status == "success") {
				window.location.href=data.redirect;
            } else {
                var alertmsg = '<br><br><span class="label label-danger cryptoexchanger-badge-text"><i class="fa fa-times"></i> '+data.msg+'</span>';
				$("#ce_status").html(alertmsg);
			}
		}
	});
}

function ce_load_coin_info() {
    var url = $("#wurl").val();
    var data_url = url + "app/requests/load.php?a=coin_info";
	$.ajax({
		type: "GET",
		url: data_url,
		dataType: "json",
		success: function (data) {
            if(data.status == "success") {
                var price = parseFloat(data.content.price);
                var reward = parseFloat(data.content.reward);
                var roi = parseFloat(data.content.roi);
                var volume = parseFloat(data.content.volume_24h);   
                var change = parseFloat(data.content.percent_change_24h);
                var color = '#d94040';
                if (change >= 0) {color = '#009e73';}
                $("#cprice").html(price.toFixed(2).toString() + ' USD');
                $("#cvolume").html(volume.toFixed(2).toString() + ' USD');
                $("#creward").html(reward.toFixed(2).toString() + ' BSK');
                $("#croi").html(roi.toFixed(2).toString() + ' %');
            } else {
                alert(data.msg);
            }
		}
	});
}


