


var nav = $('.nav-navigation');
var navHeight = nav.outerHeight();
$(document).scroll(function () {
  activateCurrentSection();
});
function activateCurrentSection() {
  var id;
  var sections = $('.section');
  var pos = $(document).scrollTop();
  var lastSection = sections[sections.length - 1];  // get last section
  var lastSectionTooSmall = $(lastSection).height() < $(window).height();

  if (lastSectionTooSmall) {
    var lastSectionTopPos = $(lastSection).offset().top;
    // lastSectionTriggerPos is true if 50% of the last section is visible
    var lastSectionTriggerPos = $(window).height() + $(document).scrollTop() - ($(lastSection).height() / 2);
    var lastSectionInView = lastSectionTriggerPos > lastSectionTopPos;
  }

  if (lastSectionTooSmall && lastSectionInView) {
    id = $(lastSection).attr('id');
  } else {  // else last section is >= 100% of the view check all sections to find the top one
    sections.each(function () {
      var top = $(this).offset().top - navHeight; // get the top & bottom position of the section
      var bottom = top + $(this).outerHeight();
      if (pos >= top && pos <= bottom) {
        id = $(this).attr('id');       // store the id of this section
      }
    });
  }

  /*
   if an id was set before, activate the section in the nav
   */
  if (id) {
    nav.find('button').removeClass('active-navigation');
    nav.find('button[name="' + id + '"]').addClass('active-navigation');
  }
}
$(document).ready(function () {
  $("#navigationArrow").on("click", function () {
    if ($(".mobile-navigation-height").height() == 0) {
      $(".mobile-navigation-height").animate(
        {
          height: "300px",
        });
      $(".navigation-btn").css("display", "block");
    }
    else if ($(".mobile-navigation-height").height() == 300) {
      $(".mobile-navigation-height").animate({
        height: "0px",
      });
      $(".navigation-btn").css("display", "none");
    }
  });
});


// const targetDate = new Date("January 31, 2024 00:00:00").getTime();

// function updateCountdown() {
//   const currentDate = new Date();

//   const timeRemaining = targetDate - currentDate;

//   const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//   const countdownElement = document.getElementById('countdown');
//   countdownElement.innerHTML = `
//   <p>Prices Increase In:</p>
//   <span>${days}  </span>d   <span> : ${hours} </span>s <span>: ${minutes} </span>h  <span>: ${seconds}</span>s
//    `;

//   setTimeout(updateCountdown, 1000);
// }
// updateCountdown();


// const configAwards = {
//   type: 'carousel',
//   perView: 3,
//   animationDuration: 1000,
//   breakpoints: {
//     1024: { perView: 3 },
//     768: { perView: 1 }
//   }
// }

// new Glide('.glide-awards', configAwards).mount();
// free-video 

window.cfields = [];
window._show_thank_you = function (id, message, trackcmp_url, email) {
  var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
  form.querySelector('._form-content').style.display = 'none';
  thank_you.innerHTML = message;
  thank_you.style.display = 'block';
  const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
  var visitorObject = window[vgoAlias];
  if (email && typeof visitorObject !== 'undefined') {
    visitorObject('setEmail', email);
    visitorObject('update');
  } else if (typeof (trackcmp_url) != 'undefined' && trackcmp_url) {
    // Site tracking URL to use after inline form submission.
    _load_script(trackcmp_url);
  }
  if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_error = function (id, message, html) {
  var form = document.getElementById('_form_' + id + '_'),
    err = document.createElement('div'),
    button = form.querySelector('button'),
    old_error = form.querySelector('._form_error');
  if (old_error) old_error.parentNode.removeChild(old_error);
  err.innerHTML = message;
  err.className = '_error-inner _form_error _no_arrow';
  var wrapper = document.createElement('div');
  wrapper.className = '_form-inner';
  wrapper.appendChild(err);
  button.parentNode.insertBefore(wrapper, button);
  var submitButton = form.querySelector('[id^="_form"][id$="_submit"]');
  submitButton.disabled = false;
  submitButton.classList.remove('processing');
  if (html) {
    var div = document.createElement('div');
    div.className = '_error-html';
    div.innerHTML = html;
    err.appendChild(div);
  }
};
window._load_script = function (url, callback, isSubmit) {
  var head = document.querySelector('head'), script = document.createElement('script'), r = false;
  var submitButton = document.querySelector('#_form_504_submit');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.src = url;
  if (callback) {
    script.onload = script.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
  }
  script.onerror = function () {
    if (isSubmit) {
      if (script.src.length > 10000) {
        _show_error("504", "Sorry, your submission failed. Please shorten your responses and try again.");
      } else {
        _show_error("504", "Sorry, your submission failed. Please try again.");
      }
      submitButton.disabled = false;
      submitButton.classList.remove('processing');
    }
  }

  head.appendChild(script);
};
(function () {
  if (window.location.search.search("excludeform") !== -1) return false;
  var getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  var setCookie = function (name, value) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 60 * 60 * 24 * 365;
    now.setTime(expireTime);
    document.cookie = name + '=' + value + '; expires=' + now + ';path=/; Secure; SameSite=Lax;';
  }
  // var addEvent = function (element, event, func) {
  //   if (element.addEventListener) {
  //     element.addEventListener(event, func);
  //   } else {
  //     var oldFunc = element['on' + event];
  //     element['on' + event] = function () {
  //       oldFunc.apply(this, arguments);
  //       func.apply(this, arguments);
  //     };
  //   }
  // }
  var _removed = false;
  var form_to_submit = document.getElementById('_form_504_');
  // var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

  var getUrlParam = function (name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || false;
  };

  var acctDateFormat = "%d/%m/%Y";
  var getNormalizedDate = function (date, acctFormat) {
    var decodedDate = decodeURIComponent(date);
    if (acctFormat && acctFormat.match(/(%d|%e).*%m/gi) !== null) {
      return decodedDate.replace(/(\d{2}).*(\d{2}).*(\d{4})/g, '$3-$2-$1');
    } else if (Date.parse(decodedDate)) {
      var dateObj = new Date(decodedDate);
      var year = dateObj.getFullYear();
      var month = dateObj.getMonth() + 1;
      var day = dateObj.getDate();
      return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    }
    return false;
  };

  var getNormalizedTime = function (time) {
    var hour, minutes;
    var decodedTime = decodeURIComponent(time);
    var timeParts = Array.from(decodedTime.matchAll(/(\d{1,2}):(\d{1,2})\W*([AaPp][Mm])?/gm))[0];
    if (timeParts[3]) { // 12 hour format
      var isPM = timeParts[3].toLowerCase() === 'pm';
      if (isPM) {
        hour = parseInt(timeParts[1]) === 12 ? '12' : `${parseInt(timeParts[1]) + 12}`;
      } else {
        hour = parseInt(timeParts[1]) === 12 ? '0' : timeParts[1];
      }
    } else { // 24 hour format
      hour = timeParts[1];
    }
    var normalizedHour = parseInt(hour) < 10 ? `0${parseInt(hour)}` : hour;
    var minutes = timeParts[2];
    return `${normalizedHour}:${minutes}`;
  };

  // for (var i = 0; i < allInputs.length; i++) {
  //   var regexStr = "field\\[(\\d+)\\]";
  //   var results = new RegExp(regexStr).exec(allInputs[i].name);
  //   if (results != undefined) {
  //     allInputs[i].dataset.name = allInputs[i].name.match(/\[time\]$/)
  //       ? `${window.cfields[results[1]]}_time`
  //       : window.cfields[results[1]];
  //   } else {
  //     allInputs[i].dataset.name = allInputs[i].name;
  //   }
  //   var fieldVal = getUrlParam(allInputs[i].dataset.name);

  //   if (fieldVal) {
  //     if (allInputs[i].dataset.autofill === "false") {
  //       continue;
  //     }
  //     if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
  //       if (allInputs[i].value == fieldVal) {
  //         allInputs[i].checked = true;
  //       }
  //     } else if (allInputs[i].type == "date") {
  //       allInputs[i].value = getNormalizedDate(fieldVal, acctDateFormat);
  //     } else if (allInputs[i].type == "time") {
  //       allInputs[i].value = getNormalizedTime(fieldVal);
  //     } else {
  //       allInputs[i].value = fieldVal;
  //     }
  //   }
  // }

  var remove_tooltips = function () {
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
    }
    tooltips = [];
  };
  var remove_tooltip = function (elem) {
    for (var i = 0; i < tooltips.length; i++) {
      if (tooltips[i].elem === elem) {
        tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
        tooltips.splice(i, 1);
        return;
      }
    }
  };
  var create_tooltip = function (elem, text) {
    var tooltip = document.createElement('div'),
      arrow = document.createElement('div'),
      inner = document.createElement('div'), new_tooltip = {};
    if (elem.type != 'radio' && elem.type != 'checkbox') {
      tooltip.className = '_error';
      arrow.className = '_error-arrow';
      inner.className = '_error-inner';
      inner.innerHTML = text;
      tooltip.appendChild(arrow);
      tooltip.appendChild(inner);
      elem.parentNode.appendChild(tooltip);
    } else {
      tooltip.className = '_error-inner _no_arrow';
      tooltip.innerHTML = text;
      elem.parentNode.insertBefore(tooltip, elem);
      new_tooltip.no_arrow = true;
    }
    new_tooltip.tip = tooltip;
    new_tooltip.elem = elem;
    tooltips.push(new_tooltip);
    return new_tooltip;
  };
  var resize_tooltip = function (tooltip) {
    var rect = tooltip.elem.getBoundingClientRect();
    var doc = document.documentElement,
      scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));
    if (scrollPosition < 40) {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
    } else {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
    }
  };
  var resize_tooltips = function () {
    if (_removed) return;
    for (var i = 0; i < tooltips.length; i++) {
      if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
    }
  };
  var validate_field = function (elem, remove) {
    var tooltip = null, value = elem.value, no_error = true;
    remove ? remove_tooltip(elem) : false;
    if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
    if (elem.getAttribute('required') !== null) {
      if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
        var elems = form_to_submit.elements[elem.name];
        if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
          no_error = elem.checked;
        }
        else {
          no_error = false;
          for (var i = 0; i < elems.length; i++) {
            if (elems[i].checked) no_error = true;
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (elem.type == 'checkbox') {
        var elems = form_to_submit.elements[elem.name], found = false, err = [];
        no_error = true;
        for (var i = 0; i < elems.length; i++) {
          if (elems[i].getAttribute('required') === null) continue;
          if (!found && elems[i] !== elem) return true;
          found = true;
          elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
          if (!elems[i].checked) {
            no_error = false;
            elems[i].className = elems[i].className + ' _has_error';
            err.push("Checking %s is required".replace("%s", elems[i].value));
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, err.join('<br/>'));
        }
      } else if (elem.tagName == 'SELECT') {
        var selected = true;
        if (elem.multiple) {
          selected = false;
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected) {
              selected = true;
              break;
            }
          }
        } else {
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected
              && (!elem.options[i].value
                || (elem.options[i].value.match(/\n/g)))
            ) {
              selected = false;
            }
          }
        }
        if (!selected) {
          elem.className = elem.className + ' _has_error';
          no_error = false;
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (value === undefined || value === null || value === '') {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "This field is required.");
      }
    }
    if (no_error && (elem.id == 'field[]' || elem.id == 'ca[11][v]')) {
      if (elem.className.includes('phone-input-error')) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
      }
    }
    if (no_error && elem.name == 'email') {
      if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid email address.");
      }
    }
    if (no_error && /date_field/.test(elem.className)) {
      if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid date.");
      }
    }
    tooltip ? resize_tooltip(tooltip) : false;
    return no_error;
  };
  var needs_validate = function (el) {
    if (el.getAttribute('required') !== null) {
      return true
    }
    if (el.name === 'email' && el.value !== "") {
      return true
    }

    if ((el.id == 'field[]' || el.id == 'ca[11][v]') && el.className.includes('phone-input-error')) {
      return true
    }

    return false
  };
  var validate_form = function (e) {
    var err = form_to_submit.querySelector('._form_error'), no_error = true;
    if (!submitted) {
      submitted = true;
      for (var i = 0, len = allInputs.length; i < len; i++) {
        var input = allInputs[i];
        if (needs_validate(input)) {
          if (input.type == 'tel') {
            addEvent(input, 'blur', function () {
              this.value = this.value.trim();
              validate_field(this, true);
            });
          }
          if (input.type == 'text' || input.type == 'number' || input.type == 'time') {
            addEvent(input, 'blur', function () {
              this.value = this.value.trim();
              validate_field(this, true);
            });
            addEvent(input, 'input', function () {
              validate_field(this, true);
            });
          } else if (input.type == 'radio' || input.type == 'checkbox') {
            (function (el) {
              var radios = form_to_submit.elements[el.name];
              for (var i = 0; i < radios.length; i++) {
                addEvent(radios[i], 'click', function () {
                  validate_field(el, true);
                });
              }
            })(input);
          } else if (input.tagName == 'SELECT') {
            addEvent(input, 'change', function () {
              validate_field(this, true);
            });
          } else if (input.type == 'textarea') {
            addEvent(input, 'input', function () {
              validate_field(this, true);
            });
          }
        }
      }
    }
    remove_tooltips();
    for (var i = 0, len = allInputs.length; i < len; i++) {
      var elem = allInputs[i];
      if (needs_validate(elem)) {
        if (elem.tagName.toLowerCase() !== "select") {
          elem.value = elem.value.trim();
        }
        validate_field(elem) ? true : no_error = false;
      }
    }
    if (!no_error && e) {
      e.preventDefault();
    }
    resize_tooltips();
    return no_error;
  };
  // addEvent(window, 'resize', resize_tooltips);
  // addEvent(window, 'scroll', resize_tooltips);

  var hidePhoneInputError = function (inputId) {
    var errorMessage = document.getElementById("error-msg-" + inputId);
    var input = document.getElementById(inputId);
    errorMessage.classList.remove("phone-error");
    errorMessage.classList.add("phone-error-hidden");
    input.classList.remove("phone-input-error");
  };

  var initializePhoneInput = function (input, defaultCountry) {
    return window.intlTelInput(input, {
      utilsScript: "https://unpkg.com/intl-tel-input@17.0.18/build/js/utils.js",
      autoHideDialCode: false,
      separateDialCode: true,
      initialCountry: defaultCountry,
      preferredCountries: []
    });
  }

  var setPhoneInputEventListeners = function (inputId, input, iti) {
    input.addEventListener('blur', function () {
      var errorMessage = document.getElementById("error-msg-" + inputId);
      if (input.value.trim()) {
        if (iti.isValidNumber()) {
          iti.setNumber(iti.getNumber());
          if (errorMessage.classList.contains("phone-error")) {
            hidePhoneInputError(inputId);
          }
        } else {
          showPhoneInputError(inputId)
        }
      } else {
        if (errorMessage.classList.contains("phone-error")) {
          hidePhoneInputError(inputId);
        }
      }
    });

    input.addEventListener("countrychange", function () {
      iti.setNumber('');
    });

    input.addEventListener("keydown", function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8) {
        e.preventDefault();
      }
    });
  };

  var showPhoneInputError = function (inputId) {
    var errorMessage = document.getElementById("error-msg-" + inputId);
    var input = document.getElementById(inputId);
    errorMessage.classList.add("phone-error");
    errorMessage.classList.remove("phone-error-hidden");
    input.classList.add("phone-input-error");
  };


  var _form_serialize = function (form) { if (!form || form.nodeName !== "FORM") { return } var i, j, q = []; for (i = 0; i < form.elements.length; i++) { if (form.elements[i].name === "") { continue } switch (form.elements[i].nodeName) { case "INPUT": switch (form.elements[i].type) { case "tel": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].previousSibling.querySelector('div.iti__selected-dial-code').innerText) + encodeURIComponent(" ") + encodeURIComponent(form.elements[i].value)); break; case "text": case "number": case "date": case "time": case "hidden": case "password": case "button": case "reset": case "submit": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "checkbox": case "radio": if (form.elements[i].checked) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)) } break; case "file": break }break; case "TEXTAREA": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "SELECT": switch (form.elements[i].type) { case "select-one": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "select-multiple": for (j = 0; j < form.elements[i].options.length; j++) { if (form.elements[i].options[j].selected) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value)) } } break }break; case "BUTTON": switch (form.elements[i].type) { case "reset": case "submit": case "button": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break }break } } return q.join("&") };

  const formSupportsPost = false;
  var form_submit = function (e) {
    e.preventDefault();
    if (validate_form()) {
      // use this trick to get the submit button & disable it using plain javascript
      var submitButton = e.target.querySelector('#_form_504_submit');
      submitButton.disabled = true;
      submitButton.classList.add('processing');
      var serialized = _form_serialize(
        document.getElementById('_form_504_')
      ).replace(/%0A/g, '\\n');
      var err = form_to_submit.querySelector('._form_error');
      err ? err.parentNode.removeChild(err) : false;
      async function submitForm() {
        var formData = new FormData();
        const searchParams = new URLSearchParams(serialized);
        searchParams.forEach((value, key) => {
          formData.append(key, value);
        });

        const response = await fetch('https://akoskarova.activehosted.com/proc.php?jsonp=true', {
          headers: {
            "Accept": "application/json"
          },
          body: formData,
          method: "POST"
        });
        return response.json();
      }

      if (formSupportsPost) {
        submitForm().then((data) => {
          eval(data.js);
        });
      } else {
        _load_script('https://akoskarova.activehosted.com/proc.php?' + serialized + '&jsonp=true', null, true);
      }
    }
    return false;
  };
  // addEvent(form_to_submit, 'submit', form_submit);
})();


const scrollInto = (id) => {
  const elmnt = document.getElementById(id);
  elmnt.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
          current = start,
          range = end - start,
          increment = end > start ? 1 : -1,
          step = Math.abs(Math.floor(duration / range)),
          timer = setInterval(() => {
            current += increment;
            obj.textContent = current + "%";

           
            if (current == end) {
              clearInterval(timer);
            }
          }, step);
      }
      counter("count1", 0, 44, 4000);
      counter("count2", 0, 15, 3000);
      counter("count3", 0, 17, 2500);
      counter("count4", 0, 24, 3500);
    }
  });
});

// observer.observe(document.querySelector('.value'));

const config = {
  type: 'carousel',
  perView: 4,
  autoplay: true,
  hoverpause: true,
  keyboard: true,
  animationDuration: 4500,
  breakpoints: {
    1024: { perView: 2 },
    700: { perView: 1.5 }
  }
}
new Glide('.glide', config).mount()

const observer2 = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
          current = start,
          range = end - start,
          increment = end > start ? 1 : -1,
          step = Math.abs(Math.floor(duration / range)),
          timer = setInterval(() => {
            current += increment;
            obj.textContent = current + "%";
            if (current == end) {
              clearInterval(timer);
            }
          }, step);
      }
      counter("count5", 0, 57, 5000);
      counter("count6", 0, 24, 4000);
      counter("count7", 0, 11, 3000);
      counter("count8", 0, 5, 300);
      counter("count9", 0, 3, 3000);
    }
  })
});

// observer2.observe(document.querySelector('.value-2'));
var string = "THIS CAN BE YOU";
var array = string.split("");
var timer;
function frameLooper() {
  if (array.length > 0) {
    document.getElementById("text").innerHTML += array.shift();
  } else {
    clearTimeout(timer);
  }
  loopTimer = setTimeout('frameLooper()', 200);

}
const observer4 = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      frameLooper();
    }
  })
});

// observer4.observe(document.querySelector('.type'));

window.cfields = [];
window._show_thank_you = function(id, message, trackcmp_url, email) {
    var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
    form.querySelector('._form-content').style.display = 'none';
    thank_you.innerHTML = message;
    thank_you.style.display = 'block';
    const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
    var visitorObject = window[vgoAlias];
    if (email && typeof visitorObject !== 'undefined') {
        visitorObject('setEmail', email);
        visitorObject('update');
    } else if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
        // Site tracking URL to use after inline form submission.
        _load_script(trackcmp_url);
    }
    if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_unsubscribe = function(id, message, trackcmp_url, email) {
    var form = document.getElementById('_form_' + id + '_'), unsub = form.querySelector('._form-thank-you');
    var branding = form.querySelector('._form-branding');
    if (branding) {
        branding.style.display = 'none';
    }
    form.querySelector('._form-content').style.display = 'none';
    unsub.style.display = 'block';
    form.insertAdjacentHTML('afterend', message)
    const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
    var visitorObject = window[vgoAlias];
    if (email && typeof visitorObject !== 'undefined') {
        visitorObject('setEmail', email);
        visitorObject('update');
    } else if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
        // Site tracking URL to use after inline form submission.
        _load_script(trackcmp_url);
    }
    if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_error = function(id, message, html) {
    var form = document.getElementById('_form_' + id + '_'),
        err = document.createElement('div'),
        button = form.querySelector('button'),
        old_error = form.querySelector('._form_error');
    if (old_error) old_error.parentNode.removeChild(old_error);
    err.innerHTML = message;
    err.className = '_error-inner _form_error _no_arrow';
    var wrapper = document.createElement('div');
    wrapper.className = '_form-inner';
    wrapper.appendChild(err);
    button.parentNode.insertBefore(wrapper, button);
    var submitButton = form.querySelector('[id^="_form"][id$="_submit"]');
    submitButton.disabled = false;
    submitButton.classList.remove('processing');
    if (html) {
        var div = document.createElement('div');
        div.className = '_error-html';
        div.innerHTML = html;
        err.appendChild(div);
    }
};
window._load_script = function(url, callback, isSubmit) {
    var head = document.querySelector('head'), script = document.createElement('script'), r = false;
    var submitButton = document.querySelector('#_form_596_submit');
    script.charset = 'utf-8';
    script.src = url;
    if (callback) {
        script.onload = script.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                callback();
            }
        };
    }
    script.onerror = function() {
        if (isSubmit) {
            if (script.src.length > 10000) {
                _show_error("596", "Sorry, your submission failed. Please shorten your responses and try again.");
            } else {
                _show_error("596", "Sorry, your submission failed. Please try again.");
            }
            submitButton.disabled = false;
            submitButton.classList.remove('processing');
        }
    }

    head.appendChild(script);
};
(function() {
    if (window.location.search.search("excludeform") !== -1) return false;
    var getCookie = function(name) {
        var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    var setCookie = function(name, value) {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 60 * 60 * 24 * 365;
        now.setTime(expireTime);
        document.cookie = name + '=' + value + '; expires=' + now + ';path=/; Secure; SameSite=Lax;';
    }
            var addEvent = function(element, event, func) {
        if (element.addEventListener) {
            element.addEventListener(event, func);
        } else {
            var oldFunc = element['on' + event];
            element['on' + event] = function() {
                oldFunc.apply(this, arguments);
                func.apply(this, arguments);
            };
        }
    }
    var _removed = false;
        var form_to_submit = document.getElementById('_form_596_');
    var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

    var getUrlParam = function(name) {
        if (name.toLowerCase() !== 'email') {
            var params = new URLSearchParams(window.location.search);
            return params.get(name) || false;
        }
        // email is a special case because a plus is valid in the email address
        var qString = window.location.search;
        if (!qString) {
            return false;
        }
        var parameters = qString.substr(1).split('&');
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i].split('=');
            if (parameter[0].toLowerCase() === 'email') {
                return parameter[1] === undefined ? true : decodeURIComponent(parameter[1]);
            }
        }
        return false;
    };

    var acctDateFormat = "%d/%m/%Y";
    var getNormalizedDate = function(date, acctFormat) {
        var decodedDate = decodeURIComponent(date);
        if (acctFormat && acctFormat.match(/(%d|%e).*%m/gi) !== null) {
            return decodedDate.replace(/(\d{2}).*(\d{2}).*(\d{4})/g, '$3-$2-$1');
        } else if (Date.parse(decodedDate)) {
            var dateObj = new Date(decodedDate);
            var year = dateObj.getFullYear();
            var month = dateObj.getMonth() + 1;
            var day = dateObj.getDate();
            return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
        }
        return false;
    };

    var getNormalizedTime = function(time) {
        var hour, minutes;
        var decodedTime = decodeURIComponent(time);
        var timeParts = Array.from(decodedTime.matchAll(/(\d{1,2}):(\d{1,2})\W*([AaPp][Mm])?/gm))[0];
        if (timeParts[3]) { // 12 hour format
            var isPM = timeParts[3].toLowerCase() === 'pm';
            if (isPM) {
                hour = parseInt(timeParts[1]) === 12 ? '12' : `${parseInt(timeParts[1]) + 12}`;
            } else {
                hour = parseInt(timeParts[1]) === 12 ? '0' : timeParts[1];
            }
        } else { // 24 hour format
            hour = timeParts[1];
        }
        var normalizedHour = parseInt(hour) < 10 ? `0${parseInt(hour)}` : hour;
        var minutes = timeParts[2];
        return `${normalizedHour}:${minutes}`;
    };

    for (var i = 0; i < allInputs.length; i++) {
        var regexStr = "field\\[(\\d+)\\]";
        var results = new RegExp(regexStr).exec(allInputs[i].name);
        if (results != undefined) {
            allInputs[i].dataset.name = allInputs[i].name.match(/\[time\]$/)
                ? `${window.cfields[results[1]]}_time`
                : window.cfields[results[1]];
        } else {
            allInputs[i].dataset.name = allInputs[i].name;
        }
        var fieldVal = getUrlParam(allInputs[i].dataset.name);

        if (fieldVal) {
            if (allInputs[i].dataset.autofill === "false") {
                continue;
            }
            if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
                if (allInputs[i].value == fieldVal) {
                    allInputs[i].checked = true;
                }
            } else if (allInputs[i].type == "date") {
                allInputs[i].value = getNormalizedDate(fieldVal, acctDateFormat);
            } else if (allInputs[i].type == "time") {
                allInputs[i].value = getNormalizedTime(fieldVal);
            } else {
                allInputs[i].value = fieldVal;
            }
        }
    }

    var remove_tooltips = function() {
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
        }
        tooltips = [];
    };
    var remove_tooltip = function(elem) {
        for (var i = 0; i < tooltips.length; i++) {
            if (tooltips[i].elem === elem) {
                tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
                tooltips.splice(i, 1);
                return;
            }
        }
    };
    var create_tooltip = function(elem, text) {
        var tooltip = document.createElement('div'),
            arrow = document.createElement('div'),
            inner = document.createElement('div'), new_tooltip = {};
        if (elem.type != 'radio' && elem.type != 'checkbox') {
            tooltip.className = '_error';
            arrow.className = '_error-arrow';
            inner.className = '_error-inner';
            inner.innerHTML = text;
            tooltip.appendChild(arrow);
            tooltip.appendChild(inner);
            elem.parentNode.appendChild(tooltip);
        } else {
            tooltip.className = '_error-inner _no_arrow';
            tooltip.innerHTML = text;
            elem.parentNode.insertBefore(tooltip, elem);
            new_tooltip.no_arrow = true;
        }
        new_tooltip.tip = tooltip;
        new_tooltip.elem = elem;
        tooltips.push(new_tooltip);
        return new_tooltip;
    };
    var resize_tooltip = function(tooltip) {
        var rect = tooltip.elem.getBoundingClientRect();
        var doc = document.documentElement,
            scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0));
        if (scrollPosition < 40) {
            tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
        } else {
            tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
        }
    };
    var resize_tooltips = function() {
        if (_removed) return;
        for (var i = 0; i < tooltips.length; i++) {
            if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
        }
    };
    var validate_field = function(elem, remove) {
        var tooltip = null, value = elem.value, no_error = true;
        remove ? remove_tooltip(elem) : false;
        if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
        if (elem.getAttribute('required') !== null) {
            if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
                var elems = form_to_submit.elements[elem.name];
                if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
                    no_error = elem.checked;
                }
                else {
                    no_error = false;
                    for (var i = 0; i < elems.length; i++) {
                        if (elems[i].checked) no_error = true;
                    }
                }
                if (!no_error) {
                    tooltip = create_tooltip(elem, "Please select an option.");
                }
            } else if (elem.type =='checkbox') {
                var elems = form_to_submit.elements[elem.name], found = false, err = [];
                no_error = true;
                for (var i = 0; i < elems.length; i++) {
                    if (elems[i].getAttribute('required') === null) continue;
                    if (!found && elems[i] !== elem) return true;
                    found = true;
                    elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
                    if (!elems[i].checked) {
                        no_error = false;
                        elems[i].className = elems[i].className + ' _has_error';
                        err.push("Checking %s is required".replace("%s", elems[i].value));
                    }
                }
                if (!no_error) {
                    tooltip = create_tooltip(elem, err.join('<br/>'));
                }
            } else if (elem.tagName == 'SELECT') {
                var selected = true;
                if (elem.multiple) {
                    selected = false;
                    for (var i = 0; i < elem.options.length; i++) {
                        if (elem.options[i].selected) {
                            selected = true;
                            break;
                        }
                    }
                } else {
                    for (var i = 0; i < elem.options.length; i++) {
                        if (elem.options[i].selected
                            && (!elem.options[i].value
                            || (elem.options[i].value.match(/\n/g)))
                        ) {
                            selected = false;
                        }
                    }
                }
                if (!selected) {
                    elem.className = elem.className + ' _has_error';
                    no_error = false;
                    tooltip = create_tooltip(elem, "Please select an option.");
                }
            } else if (value === undefined || value === null || value === '') {
                elem.className = elem.className + ' _has_error';
                no_error = false;
                tooltip = create_tooltip(elem, "This field is required.");
            }
        }
        if (no_error && (elem.id == 'field[]' || elem.id == 'ca[11][v]')) {
            if (elem.className.includes('phone-input-error')) {
                elem.className = elem.className + ' _has_error';
                no_error = false;
            }
        }
        if (no_error && elem.name == 'email') {
            if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
                elem.className = elem.className + ' _has_error';
                no_error = false;
                tooltip = create_tooltip(elem, "Enter a valid email address.");
            }
        }
        if (no_error && /date_field/.test(elem.className)) {
            if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
                elem.className = elem.className + ' _has_error';
                no_error = false;
                tooltip = create_tooltip(elem, "Enter a valid date.");
            }
        }
        tooltip ? resize_tooltip(tooltip) : false;
        return no_error;
    };
    var needs_validate = function(el) {
        if(el.getAttribute('required') !== null){
            return true
        }
        if(el.name === 'email' && el.value !== ""){
            return true
        }

        if((el.id == 'field[]' || el.id == 'ca[11][v]') && el.className.includes('phone-input-error')){
            return true
        }

        return false
    };
    var validate_form = function(e) {
        var err = form_to_submit.querySelector('._form_error'), no_error = true;
        if (!submitted) {
            submitted = true;
            for (var i = 0, len = allInputs.length; i < len; i++) {
                var input = allInputs[i];
                if (needs_validate(input)) {
                    if (input.type == 'tel') {
                        addEvent(input, 'blur', function() {
                            this.value = this.value.trim();
                            validate_field(this, true);
                        });
                    }
                    if (input.type == 'text' || input.type == 'number' || input.type == 'time') {
                        addEvent(input, 'blur', function() {
                            this.value = this.value.trim();
                            validate_field(this, true);
                        });
                        addEvent(input, 'input', function() {
                            validate_field(this, true);
                        });
                    } else if (input.type == 'radio' || input.type == 'checkbox') {
                        (function(el) {
                            var radios = form_to_submit.elements[el.name];
                            for (var i = 0; i < radios.length; i++) {
                                addEvent(radios[i], 'click', function() {
                                    validate_field(el, true);
                                });
                            }
                        })(input);
                    } else if (input.tagName == 'SELECT') {
                        addEvent(input, 'change', function() {
                            validate_field(this, true);
                        });
                    } else if (input.type == 'textarea'){
                        addEvent(input, 'input', function() {
                            validate_field(this, true);
                        });
                    }
                }
            }
        }
        remove_tooltips();
        for (var i = 0, len = allInputs.length; i < len; i++) {
            var elem = allInputs[i];
            if (needs_validate(elem)) {
                if (elem.tagName.toLowerCase() !== "select") {
                    elem.value = elem.value.trim();
                }
                validate_field(elem) ? true : no_error = false;
            }
        }
        if (!no_error && e) {
            e.preventDefault();
        }
        resize_tooltips();
        return no_error;
    };
    addEvent(window, 'resize', resize_tooltips);
    addEvent(window, 'scroll', resize_tooltips);

    var hidePhoneInputError = function(inputId) {
        var errorMessage =  document.getElementById("error-msg-" + inputId);
        var input = document.getElementById(inputId);
        errorMessage.classList.remove("phone-error");
        errorMessage.classList.add("phone-error-hidden");
        input.classList.remove("phone-input-error");
    };

    var initializePhoneInput = function(input, defaultCountry) {
        return window.intlTelInput(input, {
            utilsScript: "https://unpkg.com/intl-tel-input@17.0.18/build/js/utils.js",
            autoHideDialCode: false,
            separateDialCode: true,
            initialCountry: defaultCountry,
            preferredCountries: []
        });
    }

    var setPhoneInputEventListeners = function(inputId, input, iti) {
        input.addEventListener('blur', function() {
            var errorMessage = document.getElementById("error-msg-" + inputId);
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    iti.setNumber(iti.getNumber());
                    if (errorMessage.classList.contains("phone-error")){
                        hidePhoneInputError(inputId);
                    }
                } else {
                    showPhoneInputError(inputId)
                }
            } else {
                if (errorMessage.classList.contains("phone-error")){
                    hidePhoneInputError(inputId);
                }
            }
        });

        input.addEventListener("countrychange", function() {
            iti.setNumber('');
        });

        input.addEventListener("keydown", function(e) {
            var charCode = (e.which) ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8) {
                e.preventDefault();
            }
        });
    };

    var showPhoneInputError = function(inputId) {
        var errorMessage =  document.getElementById("error-msg-" + inputId);
        var input = document.getElementById(inputId);
        errorMessage.classList.add("phone-error");
        errorMessage.classList.remove("phone-error-hidden");
        input.classList.add("phone-input-error");
    };


    var _form_serialize = function(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=0;i<form.elements.length;i++){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"tel":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].previousSibling.querySelector('div.iti__selected-dial-code').innerText)+encodeURIComponent(" ")+encodeURIComponent(form.elements[i].value));break;case"text":case"number":case"date":case"time":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=0;j<form.elements[i].options.length;j++){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};

    const formSupportsPost = false;
          var form_submit = function(e) {
        e.preventDefault();
        if (validate_form()) {
            // use this trick to get the submit button & disable it using plain javascript
            var submitButton = e.target.querySelector('#_form_596_submit');
            submitButton.disabled = true;
            submitButton.classList.add('processing');
                        var serialized = _form_serialize(
                document.getElementById('_form_596_')
            ).replace(/%0A/g, '\\n');
            var err = form_to_submit.querySelector('._form_error');
            err ? err.parentNode.removeChild(err) : false;
            async function submitForm() {
              var formData = new FormData();
              const searchParams = new URLSearchParams(serialized);
              searchParams.forEach((value, key) => {
                formData.append(key, value);
              });

              const response = await fetch('https://akoskarova.activehosted.com/proc.php?jsonp=true', {
                headers: {
                  "Accept": "application/json"
                },
                body: formData,
                method: "POST"
              });
              return response.json();
            }
                if (formSupportsPost) {
                  submitForm().then((data) => {
                    eval(data.js);
                  });
                } else {
                  _load_script('https://akoskarova.activehosted.com/proc.php?' + serialized + '&jsonp=true', null, true);
                }
        }
        return false;
    };
    addEvent(form_to_submit, 'submit', form_submit);
})(); 

// Calculator
const calculatorPrice = document.getElementById('calculator-monthly-price');
const calculatorPriceBox = document.getElementById('calculator-price-box');
const calculator = {
  type: 1499,
  rati: 500,
}

document.getElementsByName('calculator-rati').forEach((el) =>
  el.addEventListener("change", (e) => {
    calculator.rati = parseInt(e.target.value);
    canCalculate();
    calculate();
  })
);

document.getElementsByName('academy-price').forEach((el) =>
  el.addEventListener("change", (e) => {
    calculator.type = parseInt(e.target.value);
    canCalculate();
    calculate();
  })
);

const canCalculate = () => {
  if (calculator.rati != null && parseInt(calculator.type) > 0) {
    calculatorPriceBox.style.visibility = 'visible';
  } else {
    calculatorPriceBox.style.visibility = 'hidden';
  }
}

const calculate = () => {
  if (calculator.rati === 0) {
    calculatorPrice.innerHTML = calculator.type;
  } else {
    const price = Math.round(Number(calculator.type) / Number(calculator.rati));
    calculatorPrice.innerHTML = price;
  }
}
const chooseAcademy = document.querySelectorAll(".label-academy");

chooseAcademy.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chooseAcademy.forEach(f => f.classList.remove('active'));
    e.target.classList.toggle("active");
  });
});
const chooseInstalment = document.querySelectorAll(".label-instalments");

chooseInstalment.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chooseInstalment.forEach((f) => f.classList.remove('active'));
    e.target.classList.toggle("active");
  });
});

// End of calculator

// const observer3 = new IntersectionObserver(entries => {
//   // Loop over the entries
//   entries.forEach(entry => {
//     // If the element is visible
//     if (entry.isIntersecting) {
//       // Add the animation class
//       function counter(id, start, end, duration) {
//         let obj = document.getElementById(id),
//           current = start,
//           range = end - start,
//           increment = end > start ? 1 : -1,
//           step = Math.abs(Math.floor(duration / range)),
//           timer = setInterval(() => {
//             current += increment;
//             obj.textContent = current + "%";
//             if (current == end) {
//               clearInterval(timer);
//             }
//           }, step);
//       }
//       counter("count11", 0, 95, 5500);
//       counter("count22", 0, 50, 3500);
//       counter("count33", 0, 67, 4500);
//     }
//   });
// });

// observer3.observe(document.querySelector('.percent-bottom'));


window.cfields = { "14": "choose_academy" };
window._show_thank_you = function (id, message, trackcmp_url, email) {
  var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
  form.querySelector('._form-content').style.display = 'none';
  thank_you.innerHTML = message;
  thank_you.style.display = 'block';
  const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
  var visitorObject = window[vgoAlias];
  if (email && typeof visitorObject !== 'undefined') {
    visitorObject('setEmail', email);
    visitorObject('update');
  } else if (typeof (trackcmp_url) != 'undefined' && trackcmp_url) {
    // Site tracking URL to use after inline form submission.
    _load_script(trackcmp_url);
  }
  if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_error = function (id, message, html) {
  var form = document.getElementById('_form_' + id + '_'), err = document.createElement('div'), button = form.querySelector('button'), old_error = form.querySelector('._form_error');
  if (old_error) old_error.parentNode.removeChild(old_error);
  err.innerHTML = message;
  err.className = '_error-inner _form_error _no_arrow';
  var wrapper = document.createElement('div');
  wrapper.className = '_form-inner';
  wrapper.appendChild(err);
  button.parentNode.insertBefore(wrapper, button);
  document.querySelector('[id^="_form"][id$="_submit"]').disabled = false;
  if (html) {
    var div = document.createElement('div');
    div.className = '_error-html';
    div.innerHTML = html;
    err.appendChild(div);
  }
};
window._load_script = function (url, callback) {
  var head = document.querySelector('head'), script = document.createElement('script'), r = false;
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.src = url;
  if (callback) {
    script.onload = script.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
  }
  head.appendChild(script);
};
(function () {
  if (window.location.search.search("excludeform") !== -1) return false;
  var getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  var setCookie = function (name, value) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 60 * 60 * 24 * 365;
    now.setTime(expireTime);
    document.cookie = name + '=' + value + '; expires=' + now + ';path=/; Secure; SameSite=Lax;';// cannot be HttpOnly
  }
  var addEvent = function (element, event, func) {
    if (element.addEventListener) {
      element.addEventListener(event, func);
    } else {
      var oldFunc = element['on' + event];
      element['on' + event] = function () {
        oldFunc.apply(this, arguments);
        func.apply(this, arguments);
      };
    }
  }
  var _removed = false;
  var form_to_submit = document.getElementById('_form_298_');
  var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

  var getUrlParam = function (name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || false;
  };

  for (var i = 0; i < allInputs.length; i++) {
    var regexStr = "field\\[(\\d+)\\]";
    var results = new RegExp(regexStr).exec(allInputs[i].name);
    if (results != undefined) {
      allInputs[i].dataset.name = window.cfields[results[1]];
    } else {
      allInputs[i].dataset.name = allInputs[i].name;
    }
    var fieldVal = getUrlParam(allInputs[i].dataset.name);

    if (fieldVal) {
      if (allInputs[i].dataset.autofill === "false") {
        continue;
      }
      if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
        if (allInputs[i].value == fieldVal) {
          allInputs[i].checked = true;
        }
      } else {
        allInputs[i].value = fieldVal;
      }
    }
  }

  var remove_tooltips = function () {
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
    }
    tooltips = [];
  };
  var remove_tooltip = function (elem) {
    for (var i = 0; i < tooltips.length; i++) {
      if (tooltips[i].elem === elem) {
        tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
        tooltips.splice(i, 1);
        return;
      }
    }
  };
  var create_tooltip = function (elem, text) {
    var tooltip = document.createElement('div'), arrow = document.createElement('div'), inner = document.createElement('div'), new_tooltip = {};
    if (elem.type != 'radio' && elem.type != 'checkbox') {
      tooltip.className = '_error';
      arrow.className = '_error-arrow';
      inner.className = '_error-inner';
      inner.innerHTML = text;
      tooltip.appendChild(arrow);
      tooltip.appendChild(inner);
      elem.parentNode.appendChild(tooltip);
    } else {
      tooltip.className = '_error-inner _no_arrow';
      tooltip.innerHTML = text;
      elem.parentNode.insertBefore(tooltip, elem);
      new_tooltip.no_arrow = true;
    }
    new_tooltip.tip = tooltip;
    new_tooltip.elem = elem;
    tooltips.push(new_tooltip);
    return new_tooltip;
  };
  var resize_tooltip = function (tooltip) {
    var rect = tooltip.elem.getBoundingClientRect();
    var doc = document.documentElement, scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));
    if (scrollPosition < 40) {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
    } else {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
    }
  };
  var resize_tooltips = function () {
    if (_removed) return;
    for (var i = 0; i < tooltips.length; i++) {
      if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
    }
  };
  var validate_field = function (elem, remove) {
    var tooltip = null, value = elem.value, no_error = true;
    remove ? remove_tooltip(elem) : false;
    if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
    if (elem.getAttribute('required') !== null) {
      if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
        var elems = form_to_submit.elements[elem.name];
        if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
          no_error = elem.checked;
        }
        else {
          no_error = false;
          for (var i = 0; i < elems.length; i++) {
            if (elems[i].checked) no_error = true;
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (elem.type == 'checkbox') {
        var elems = form_to_submit.elements[elem.name], found = false, err = [];
        no_error = true;
        for (var i = 0; i < elems.length; i++) {
          if (elems[i].getAttribute('required') === null) continue;
          if (!found && elems[i] !== elem) return true;
          found = true;
          elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
          if (!elems[i].checked) {
            no_error = false;
            elems[i].className = elems[i].className + ' _has_error';
            err.push("Checking %s is required".replace("%s", elems[i].value));
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, err.join('<br/>'));
        }
      } else if (elem.tagName == 'SELECT') {
        var selected = true;
        if (elem.multiple) {
          selected = false;
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected) {
              selected = true;
              break;
            }
          }
        } else {
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected && (!elem.options[i].value || (elem.options[i].value.match(/\n/g)))) {
              selected = false;
            }
          }
        }
        if (!selected) {
          elem.className = elem.className + ' _has_error';
          no_error = false;
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (value === undefined || value === null || value === '') {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "This field is required.");
      }
    }
    if (no_error && (elem.id == 'field[]' || elem.id == 'ca[11][v]')) {
      if (elem.className.includes('phone-input-error')) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
      }
    }
    if (no_error && elem.name == 'email') {
      if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid email address.");
      }
    }
    if (no_error && /date_field/.test(elem.className)) {
      if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid date.");
      }
    }
    tooltip ? resize_tooltip(tooltip) : false;
    return no_error;
  };
  var needs_validate = function (el) {
    if (el.getAttribute('required') !== null) {
      return true
    }
    if (el.name === 'email' && el.value !== "") {
      return true
    }

    if ((el.id == 'field[]' || el.id == 'ca[11][v]') && el.className.includes('phone-input-error')) {
      return true
    }

    return false
  };
  var validate_form = function (e) {
    var err = form_to_submit.querySelector('._form_error'), no_error = true;
    if (!submitted) {
      submitted = true;
      for (var i = 0, len = allInputs.length; i < len; i++) {
        var input = allInputs[i];
        if (needs_validate(input)) {
          if (input.type == 'tel') {
            addEvent(input, 'blur', function () {
              this.value = this.value.trim();
              validate_field(this, true);
            });
          }
          if (input.type == 'text' || input.type == 'number' || input.type == 'time') {
            addEvent(input, 'blur', function () {
              this.value = this.value.trim();
              validate_field(this, true);
            });
            addEvent(input, 'input', function () {
              validate_field(this, true);
            });
          } else if (input.type == 'radio' || input.type == 'checkbox') {
            (function (el) {
              var radios = form_to_submit.elements[el.name];
              for (var i = 0; i < radios.length; i++) {
                addEvent(radios[i], 'click', function () {
                  validate_field(el, true);
                });
              }
            })(input);
          } else if (input.tagName == 'SELECT') {
            addEvent(input, 'change', function () {
              validate_field(this, true);
            });
          } else if (input.type == 'textarea') {
            addEvent(input, 'input', function () {
              validate_field(this, true);
            });
          }
        }
      }
    }
    remove_tooltips();
    for (var i = 0, len = allInputs.length; i < len; i++) {
      var elem = allInputs[i];
      if (needs_validate(elem)) {
        if (elem.tagName.toLowerCase() !== "select") {
          elem.value = elem.value.trim();
        }
        validate_field(elem) ? true : no_error = false;
      }
    }
    if (!no_error && e) {
      e.preventDefault();
    }
    resize_tooltips();
    return no_error;
  };
  addEvent(window, 'resize', resize_tooltips);
  addEvent(window, 'scroll', resize_tooltips);

  var hidePhoneInputError = function (inputId) {
    var errorMessage = document.getElementById("error-msg-" + inputId);
    var input = document.getElementById(inputId);
    errorMessage.classList.remove("phone-error");
    errorMessage.classList.add("phone-error-hidden");
    input.classList.remove("phone-input-error");
  };

  var initializePhoneInput = function (input, defaultCountry) {
    return window.intlTelInput(input, {
      utilsScript: "https://unpkg.com/intl-tel-input@17.0.18/build/js/utils.js",
      autoHideDialCode: false,
      separateDialCode: true,
      initialCountry: defaultCountry,
      preferredCountries: []
    });
  }

  var setPhoneInputEventListeners = function (inputId, input, iti) {
    input.addEventListener('blur', function () {
      var errorMessage = document.getElementById("error-msg-" + inputId);
      if (input.value.trim()) {
        if (iti.isValidNumber()) {
          iti.setNumber(iti.getNumber());
          if (errorMessage.classList.contains("phone-error")) {
            hidePhoneInputError(inputId);
          }
        } else {
          showPhoneInputError(inputId)
        }
      } else {
        if (errorMessage.classList.contains("phone-error")) {
          hidePhoneInputError(inputId);
        }
      }
    });

    input.addEventListener("countrychange", function () {
      iti.setNumber('');
    });

    input.addEventListener("keydown", function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8) {
        e.preventDefault();
      }
    });
  };

  var showPhoneInputError = function (inputId) {
    var errorMessage = document.getElementById("error-msg-" + inputId);
    var input = document.getElementById(inputId);
    errorMessage.classList.add("phone-error");
    errorMessage.classList.remove("phone-error-hidden");
    input.classList.add("phone-input-error");
  };


  var _form_serialize = function (form) { if (!form || form.nodeName !== "FORM") { return } var i, j, q = []; for (i = 0; i < form.elements.length; i++) { if (form.elements[i].name === "") { continue } switch (form.elements[i].nodeName) { case "INPUT": switch (form.elements[i].type) { case "tel": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].previousSibling.querySelector('div.iti__selected-dial-code').innerText) + encodeURIComponent(" ") + encodeURIComponent(form.elements[i].value)); break; case "text": case "number": case "date": case "time": case "hidden": case "password": case "button": case "reset": case "submit": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "checkbox": case "radio": if (form.elements[i].checked) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)) } break; case "file": break }break; case "TEXTAREA": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "SELECT": switch (form.elements[i].type) { case "select-one": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case "select-multiple": for (j = 0; j < form.elements[i].options.length; j++) { if (form.elements[i].options[j].selected) { q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value)) } } break }break; case "BUTTON": switch (form.elements[i].type) { case "reset": case "submit": case "button": q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break }break } } return q.join("&") };
  var form_submit = function (e) {
    e.preventDefault();
    if (validate_form()) {
      // use this trick to get the submit button & disable it using plain javascript
      document.querySelector('#_form_298_submit').disabled = true;
      var serialized = _form_serialize(document.getElementById('_form_298_')).replace(/%0A/g, '\\n');
      var err = form_to_submit.querySelector('._form_error');
      err ? err.parentNode.removeChild(err) : false;
      _load_script('https://akoskarova.activehosted.com/proc.php?' + serialized + '&jsonp=true');
    }
    return false;
  };
  addEvent(form_to_submit, 'submit', form_submit);
})();

// gezim video

const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('#video');
let playButton = document.querySelector('#playButton');
let pauseButton = document.querySelector('#pauseButton');


playButton.style.display = 'block';
pauseButton.style.display = 'none';

function playVideo() {
    playButton.style.display = 'none'; 
    pauseButton.style.display = 'block';
    video.play();
}


function pauseVideo() {
    video.pause();
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
}


playButton.addEventListener('click', playVideo); 
pauseButton.addEventListener('click', pauseVideo);

videoContainer.addEventListener('mouseenter', function() {
if (!video.paused) {
    pauseButton.style.display = 'block';
}
});

videoContainer.addEventListener('mouseleave', function() {
pauseButton.style.display = 'none';
});

// US Diploma Program

const videoContainerUS = document.querySelector('.video-container-us-program');
const videoUS = document.querySelector('#videoUS');
let playButtonUS = document.querySelector('#playButtonUS');
let pauseButtonUS = document.querySelector('#pauseButtonUS');


playButtonUS.style.display = 'block';
pauseButtonUS.style.display = 'none';

function playVideoUS() {
    playButtonUS.style.display = 'none'; 
    pauseButtonUS.style.display = 'block';
    videoUS.play();
}


function pauseVideoUS() {
    videoUS.pause();
    pauseButtonUS.style.display = 'none';
    playButtonUS.style.display = 'block';
}


playButtonUS.addEventListener('click', playVideoUS); 
pauseButtonUS.addEventListener('click', pauseVideoUS);

videoContainerUS.addEventListener('mouseenter', function() {
if (!videoUS.paused) {
    pauseButtonUS.style.display = 'block';
}
});

videoContainerUS.addEventListener('mouseleave', function() {
pauseButtonUS.style.display = 'none';
});
