let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  new WOW().init();

  //phone size menu onclick
  $("#menu-id").click(function (e) {
    e.preventDefault();
    $(".navgition").toggleClass("reset-left");
    $("body").toggleClass("overflow");
  });
  $(".nav-head .close-menu").click(function () {
    $(".navgition").removeClass("reset-left");
    $("body").removeClass("overflow");
  });
  if ($(window).width() <= 1199) {
    //slide down menu
    $(".lang-anchor .lang-cont").click(function (e) {
      e.preventDefault();
      $(this).siblings(".dropdown-content").slideToggle(400);
    });
    $(".close-menu").click(function (e) {
      e.preventDefault();
      $(".lang-anchor .lang-cont").siblings(".dropdown-content").slideUp(400);
    });
  }
  //////////** fixed arrow to top**//////////
  $(".arrow-top").click(function () {
    $("html").css("scroll-behavior", "unset");

    $("html,body").animate(
      {
        scrollTop: 0,
      },
      1000,
      "swing"
    );
    setTimeout(() => {
      $("html").css("scroll-behavior", "smooth");
    }, 1000);
  });
  $(this).scrollTop() >= 500
    ? $(".arrow-top").fadeIn(300)
    : $(".arrow-top").fadeOut(300);

  $(window).scroll(function () {
    $(this).scrollTop() >= 500
      ? $(".arrow-top").fadeIn(300)
      : $(".arrow-top").fadeOut(300);
  });

  //otp code animation
  $(".otp-form *:input[type!=hidden]:first").focus();
  let otp_fields = $(".otp-form .otp-field"),
    otp_value_field = $(".otp-form .otp-value");
  otp_fields
    .on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
      let opt_value = "";
      otp_fields.each(function () {
        let field_value = $(this).val();
        if (field_value != "") opt_value += field_value;
      });
      otp_value_field.val(opt_value);
    })
    .on("keyup", function (e) {
      let key = e.keyCode || e.charCode;
      if (key == 8 || key == 46 || key == 37 || key == 40) {
        // Backspace or Delete or Left Arrow or Down Arrow
        $(this).prev().focus();
      } else if (key == 38 || key == 39 || $(this).val() != "") {
        // Right Arrow or Top Arrow or Value not empty
        $(this).next().focus();
      }
    })
    .on("paste", function (e) {
      let paste_data = e.originalEvent.clipboardData.getData("text");
      let paste_data_splitted = paste_data.split("");
      $.each(paste_data_splitted, function (index, value) {
        otp_fields.eq(index).val(value);
      });
    });
  //otp timer
  const timerExists =
    document.getElementsByClassName("countDown-cont").length > 0;
  if (timerExists) {
    function countdown() {
      var seconds = 59;
      function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else {
          // document.getElementById("counter").innerHTML = "";
        }
      }
      tick();
    }
    countdown();
  }
  const dateExists = document.getElementsByClassName("selector").length > 0;
  if (dateExists) {
    $(".selector").flatpickr({});
    $(".select-date").flatpickr({
      defaultDate: "today",
    });
  }
  const selectExists =
    document.getElementsByClassName("select_input").length > 0;
  if (selectExists) {
    const $select2 = $(".select_input");
    $select2.select2();
  }
  //swiper slider
  const swiperImg = new Swiper(".about-img-cont .swiper", {
    // loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    on: {
      click() {
        swiperImg.slideTo(this.clickedIndex);
      },
    },
  });
  const swiperContent = new Swiper(".about-content .swiper", {
    // loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    allowTouchMove: false
  });
  swiperImg.controller.control = swiperContent;
  // swiperContent.controller.control = swiperImg;
  const swiperVideos = new Swiper(".videos-swiper .swiper", {
    loop: false,
    centeredSlides: true,
    slidesPerView: 1,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: true
    // },
    navigation: {
      nextEl: ".videos-swiper .swiper-btn-next",
      prevEl: ".videos-swiper .swiper-btn-prev",
    },
  });

  const circle = new CircularProgressBar("pie");
  circle.initial();
  //file input
  $(".custom-file-upload .upload-change").change(function () {
    let file_val;
    if ($(this).val() == "") {
      file_val = $(".file-txt").data("title");
    } else {
      file_val = $(this).prop("files")[0].name;
    }
    $(this).next().html(file_val);
  });
  lazyLoad();

  //wizard form
  $(document).ready(function () {
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {
      current_fs = $(this).parent().parent();
      next_fs = $(this).parent().parent().next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              display: "none",
              // position: "relative",
            });
            next_fs.css({ opacity: opacity });
          },
          duration: 500,
        }
      );
      setProgressBar(++current);
    });

    $(".previous").click(function () {
      current_fs = $(this).parent().parent();
      previous_fs = $(this).parent().parent().prev();

      //Remove class active
      $("#progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");

      //show the previous fieldset
      previous_fs.show();

      //hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              display: "none",
              // position: "relative",
            });
            previous_fs.css({ opacity: opacity });
          },
          duration: 500,
        }
      );
      setProgressBar(--current);
    });

    function setProgressBar(curStep) {
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar-form").css("width", percent + "%");
    }

    $(".submit").click(function () {
      return false;
    });
  });
  //radio button change text
  $(".radiogroup").change(function (e) {
    var selectedValue = $(this).val();
    console.log(selectedValue);
    var radioText = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .siblings(".measure-parent")
      .find(".radio-text");
    console.log(radioText);
    radioText.empty().append(selectedValue);
  });
});
///////////
//showPass
function showPass(showPass) {
  sibling = showPass.parentElement.nextElementSibling;
  // sibling.focus();
  if (showPass.checked) {
    sibling.setAttribute("type", "text");
  } else {
    sibling.setAttribute("type", "password");
  }
}
//lazy load

function lazyLoad() {
  const images = document.querySelectorAll(".lazy-img");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function preloadImage(img) {
  img.src = img.getAttribute("data-src");
  img.onload = function () {
    img.parentElement.classList.remove("loading-img");
    img.parentElement.classList.add("loaded-img");
    // img.parentElement.parentElement.classList.add("lazy-head-img");
  };
}
