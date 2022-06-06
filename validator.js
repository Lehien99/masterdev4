function Validator(options) {
  // console.log(options);
  var formElement = document.querySelector(options.form);
  // console.log(formElement);
  var selectorRules = {};

  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errMessage;

    var rules = selectorRules[rule.selector];
    for (var i = 0; i < rules.length; i++) {
      errMessage = rules[i](inputElement.value);
      if (errMessage) break;
    }

    // console.log(rule);
    if (errMessage) {
      errorElement.innerText = errMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
    return !errMessage;
  }

  if (formElement) {
    formElement.onsubmit = function (e) {
      // e.prevenDefault();

      var isFormValid = true;

      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      // var enableInputs = document.querySelectorAll("[name]");
      // var formValues = Array.from(enableInputs).reduce(function (values, input) {
      //   return  values;
      // },{});

      // console.log(formValues);
      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          options.onSubmit(formValues);
        }
      }
    };
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        // console.log(selectorRules);
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      // selectorRules[rule.selector] = rule.test;
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
    // console.log(selectorRules);
  }
}
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui long nhap truong nay ";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(value) ? undefined : "Truong nay can nhap email";
    },
  };
};

Validator.isNumber = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return isNaN(value) ? "Truong nay can nhap so" : undefined;
    },
  };
};
Validator.isLenght = function (selector, min, max) {
  return {
    selector: selector,
    test: function (value) {
      return value.length == min || value.length == max
        ? undefined
        : ` Vui long nhap toi thieu ${min} va toi da  ${max} ky tu`;
    },
  };
};

function personal(fullname, address, email) {
  this.fullname = fullname;
  this.address = address;
  this.email = email;
}
function showDs() {
  var i = 0;
  var show = "";
  dsCustomer.map(function (customer) {
    // console.log(customer);
    show +=
      "<tr><td>" +
      i++ +
      "</td><td>" +
      customer.fullname +
      "</td><td>" +
      customer.address +
      "</td><td>" +
      customer.email +
      "</td></tr>";
  });
  return show;
}
