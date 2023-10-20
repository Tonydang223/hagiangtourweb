$(document).ready(function () {
  "use strict";

  new Swiper(".home-swiper-container", {
    fadeEffect: { crossFade: true },
    virtualTranslate: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: true,
    // },
    speed: 1000,
    slidersPerView: 1,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  let isLoop = true;

  if($('.swiper-slide').length < 3) {
      isLoop = false;
  }
  new Swiper(".news-swiper-container", {
    loop: isLoop,
    spaceBetween: 20,
    direction: "horizontal",
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      868: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
      1250: {
        slidesPerView: 3,
      },
    },
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    speed: 800,
  });

  //photosBlog-swiper-container
  new Swiper(".photosBlog-swiper-container", {
    // spaceBetween: 15,
    loop: true,
    direction: "horizontal",
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      868: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
      1250: {
        slidesPerView: 5,
      },
    },
        autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
    grabCursor: true,
    speed: 800,
  });
  new Swiper(".vehicles-swiper-container", {
    spaceBetween: 20,
    direction: "horizontal",
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      868: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
      1250: {
        slidesPerView: 3,
      },
    },
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    speed: 800,
  });

  let isSubmitting = false;
  let itemIday = '#tabContentTravelDetail1';

  $(".loader").hide();

  $(".tab-content").hide(); //hide All content
  var defaultActive = $(".menu_tabs li.active-tab a").attr("href"); //store active href default value
  $(defaultActive).show();

  $(".menu_tabs li a").on('click',function (e) {
      e.preventDefault();
      $(".menu_tabs li").removeClass("active-tab");
      var related = $(this).attr("href"); //store href value
      $(this).parent().addClass("active-tab");
      if ($(this).parent().hasClass("active-tab")) {
          $(".tab-content").hide();
          $(related).show();
      }
  })

  $('.contentTabTravelDetails').hide();
  var defaultTabTravelDetail = $('.travelDates li.active-tab-travel a').attr("href");
  $(defaultTabTravelDetail).show();

  $('.travelDates li a').on('click', function (e) {
    e.preventDefault();
    
    $('.travelDates li').removeClass('active-tab-travel');

    const relatedTrv = $(this).attr("href");
    $(this).parent().addClass('active-tab-travel');
    if($(this).parent().hasClass('active-tab-travel')) {
        $('.contentTabTravelDetails').hide();
        $(relatedTrv).show();
    }
  });




  $('#menuScrollDay li').on('click', function (e) {
    const refC = $(this).attr('data-scroll-menu');
    const anchor = $(`#${refC}`).offset();

    $('html, body').animate({ scrollTop: anchor.top },500);
    return false;  
  });


  $('.videoPopUp').magnificPopup({
    type: 'iframe'
    // other options
  });





  function resetValForm(nameFormWrap) {
    $(`${nameFormWrap} :input`).each(function () {
      const val = $(this).parent();
      val.removeClass("success error");
    });
  }



  $(".popUpBtn").on("click", function (e) {
    $(".popUpWrapper").css("display", "block");
    $("body").css("overflow-y", "hidden");
  });

  $("#icOutModal").on("click", function (e) {
    if(isSubmitting) {
        return;
    }
    $(".popUpWrapper").css("display", "none");
    $("body").css("overflow-y", "scroll");

  });

  function submitFormTouch(e, nameFormWrap) {
    e.preventDefault();
    $(`${nameFormWrap} .loader`).show();
    isSubmitting = true;

    setTimeout(() => {
      let vals = checkInput(nameFormWrap);
      console.log('a0')
      const defaultVNumFormHome = 4;
      const defaultVNumFormContact = 3;

      if (Object.keys(vals).length === defaultVNumFormHome || Object.keys(vals).length === defaultVNumFormContact) {
        vals.message = $(`${nameFormWrap} .message`)?.val()?.trim();
        vals.country = $(`${nameFormWrap} .country`)?.val()?.trim();
        $(`${nameFormWrap} .loader`).show();
        resetValForm(nameFormWrap);
        isSubmitting = true;
        console.log('a1')
        setTimeout(() => {
          console.log('a2')
          $(`${nameFormWrap} .loader`).hide();
          $(`${nameFormWrap}`)[0].reset();
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "haidang2kx@gmail.com",
            Password: "396CDE988CB99DA2D5A84A01F58F1DDA3CDE",
            To: "haidang2kx@gmail.com",
            From: "haidang2kx@gmail.com",
            Subject: `Message From: ${vals.email}`,
            Body: `
              Liên lạc đặt tour:
              - Tên: ${vals.name}
              - Email: ${vals.email}
              - Số điện thoại: ${vals.phone}
              - Ngày đến: ${vals.date ? vals.date : ''}
              - Nội dung yêu cầu: ${
                vals?.message ? vals?.message : "Chưa có yêu cầu nào !"
              }
            `,
          }).then((message) => alert(message))
          .catch((err) => console.log(err));
          isSubmitting = false;
        }, 1000);
      } else {
        $(`${nameFormWrap} .loader`).hide();
      }
      isSubmitting = false;
    }, 1500);
  }

  $("#formInTouch").on("submit", function (e) {
    submitFormTouch(e, "#formInTouch");
  });
  $("#formInTouchPopUp").on("submit", function (e) {
    submitFormTouch(e, "#formInTouchPopUp");
  });
  $("#formContact").on("submit", function (e) {
    submitFormTouch(e, "#formContact");
  });

  function getFullDate(date) {
    return !date ? null : date.setHours(0, 0, 0, 0).valueOf();
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function checkInput(formWrap) {
    const name = $(`${formWrap} .username`)?.val()?.trim();
    const date = $(`${formWrap} .date`)?.val()?.trim();
    const phone = $(`${formWrap} .phone`)?.val()?.trim();
    const email = $(`${formWrap} .email`)?.val()?.trim();
    const currentDate = new Date();
    let res = {};

    if (!date || getFullDate(new Date(date)) < getFullDate(currentDate)) {
      setErrorFor(
        $(`${formWrap} .date`),
        "Please enter departure date and the date must be than current date !"
      );
    } else {
      setSuccessFor($(`${formWrap} .date`));
      res.date = date;
    }
    if (!phone || phone.length > 14) {
      setErrorFor(
        $(`${formWrap} .phone`),
        "Please enter a phone number and not than 14 characters !"
      );
    } else {
      setSuccessFor($(`${formWrap} .phone`));
      res.phone = phone;
    }

    if (!email || !isEmail(email)) {
      setErrorFor(
        $(`${formWrap} .email`),
        "Please enter your email and the email must be valid !"
      );
    } else {
      setSuccessFor($(`${formWrap} .email`));
      res.email = email;
    }

    if (name.length > 30 || !name) {
      setErrorFor(
        $(`${formWrap} .username`),
        "Please enter a valid name and not than 30 characters !"
      );
    } else {
      setSuccessFor($(`${formWrap} .username`));
      res.name = name;
    }

    return res;
  }

  

  function setErrorFor(input, message, type) {
    const formControl = input.parent();
    const small = formControl.find("small");
    formControl.addClass("error").removeClass("success");
    small.text(message);
  }

  function setSuccessFor(input, val, type) {
    const formControl = input.parent();
    formControl.addClass("success").removeClass("error");
  }

  $(window).on("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY < 200) {
        $(".boxBottomNav").removeClass("scrollHeader");
      } else {
        $(".boxBottomNav").addClass("scrollHeader");
    }

    $('section').each((i, obj) => {
        const height = $(obj).height();
        const top = $(obj).offset().top - 250;
        console.log("🚀 ~ file: index.js:328 ~ $ ~ height:", height)
        const id = $(obj).attr("id");
        console.log("🚀 ~ file: index.js:329 ~ $ ~ id:", id)
        if (scrollY >= top && top + height >= scrollY) {
          $('header nav li a').each((e, i) => {
            $('header nav li a').removeClass('active');
            $(`header nav li a[href="#${id}"]`)
              ?.addClass("active");
          });
        }
    });
  })
});


