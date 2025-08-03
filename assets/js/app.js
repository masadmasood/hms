window.onscroll = function () {
  const header1 = document.querySelector(".navbar");
  // Header # 1
  if (header1) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      header1.classList.add("scrolled");
    } else {
      header1.classList.remove("scrolled");
    }
  }

  // Header # 2
  const header2 = document.querySelector(".navbarToo");
  if (header2) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      header2.classList.add("scrolled");
    } else {
      header2.classList.remove("scrolled");
    }
  }
};

// Service Slider
var swiper = new Swiper(".service-slider", {
  spaceBetween: 20,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Doctor Slider
var swiper = new Swiper(".doctor-slider", {
  spaceBetween: 20,
  speed: 1000,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});



// All Doctor Slider
var swiper = new Swiper(".all-doctors", {
  spaceBetween: 20,
  speed: 1000,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});

/* ---------------- Book Appointment ---------------- */
(() => {
  "use strict";

  const selectionForm = document.getElementById("selectionForm");
  const departmentSelect = document.getElementById("department_list");
  const specialistSelect = document.getElementById("specialist_list");
  const feesInput = document.getElementById("fees");
  const timeSlotSelect = document.getElementById("time_slot");
  const doctors = {
    eye: [
      {
        name: "Dr. Moaz Meher",
        fees: "1000",
        timings: ["08:00 AM - 12:00 PM", "04:00 PM - 08:00 PM"],
      },
      {
        name: "Dr. Asad Mughal",
        fees: "2000",
        timings: ["09:00 AM - 11:00 AM", "02:00 PM - 05:00 PM"],
      },
      {
        name: "Dr. Shamama Tarif",
        fees: "3000",
        timings: ["08:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
      },
    ],
    heart: [
      {
        name: "Dr. Nisha Gill",
        fees: "1000",
        timings: ["08:00 AM - 12:00 PM", "04:00 PM - 08:00 PM"],
      },
      {
        name: "Dr. Laiba Malik",
        fees: "2000",
        timings: ["09:00 AM - 11:00 AM", "02:00 PM - 05:00 PM"],
      },
      {
        name: "Dr. Gulam Ruqia",
        fees: "3000",
        timings: ["08:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
      },
    ],
    ear: [
      {
        name: "Dr. Isha Loak",
        fees: "1000",
        timings: ["08:00 AM - 12:00 PM", "04:00 PM - 08:00 PM"],
      },
      {
        name: "Dr. Sumaira Hayat",
        fees: "2000",
        timings: ["09:00 AM - 11:00 AM", "02:00 PM - 05:00 PM"],
      },
      {
        name: "Dr. Misbah Rauf",
        fees: "3000",
        timings: ["08:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
      },
    ],
  };

  function populateSpecialists() {
    specialistSelect.innerHTML =
      '<option value="" disabled selected>Specialist</option>';
    feesInput.value = "";
    specialistSelect.disabled = true;
    timeSlotSelect.innerHTML =
      '<option value="" disabled selected>Time Slot</option>';
    timeSlotSelect.disabled = true;
    feesInput.readOnly = true;

    const selectedDepartment = departmentSelect.value;

    const specialistDoctors = doctors[selectedDepartment];

    specialistDoctors.forEach((doctor) => {
      const option = document.createElement("option");
      option.value = doctor.name;
      option.textContent = doctor.name;
      specialistSelect.appendChild(option);
    });

    specialistSelect.disabled = false;
  }

  function setFeesAndTimeSlots() {
    timeSlotSelect.innerHTML =
      '<option value="" disabled selected>Time Slot</option>';
    feesInput.value = "";
    timeSlotSelect.disabled = true;
    feesInput.readOnly = true;

    const selectedSpecialist = specialistSelect.value;

    const specialistDetails = doctors[departmentSelect.value].find(
      (doctor) => doctor.name === selectedSpecialist
    );

    if (specialistDetails) {
      feesInput.value = specialistDetails.fees;

      specialistDetails.timings.forEach((timing) => {
        const option = document.createElement("option");
        option.value = timing;
        option.textContent = timing;
        timeSlotSelect.appendChild(option);
      });
    }

    timeSlotSelect.disabled = false;
    feesInput.readOnly = true;
  }

  departmentSelect.addEventListener("change", populateSpecialists);
  specialistSelect.addEventListener("change", setFeesAndTimeSlots);

  function handleSelectionFormSubmit(event) {
    event.preventDefault();

    if (!selectionForm.checkValidity()) {
      event.stopPropagation();
      selectionForm.classList.add("was-validated");
      return;
    }

    // Retrieve form values
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("genderSelect").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const department = departmentSelect.value;
    const specialist = specialistSelect.value;
    const fees = feesInput.value;
    const timeSlot = timeSlotSelect.value;
    const additionalInfo = document.getElementById("message").value;

    const appointmentData = {
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      department,
      specialist,
      fees,
      timeSlot,
      additionalInfo,
    };

    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));

    window.location.href = "confirmation_page.html";
  }

  selectionForm.addEventListener("submit", handleSelectionFormSubmit);
})();

/* ---------------- Contact Us ---------------- */
(() => {
  "use strict";

  const contactForm = document.getElementById("contactForm");

  function handleContactFormSubmit(event) {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    contactForm.classList.add("was-validated");
  }

  contactForm.addEventListener("submit", handleContactFormSubmit);
})();

/* ---------------- Apply Now ---------------- */
// (() => {
// "use strict";

// const doctorForm = document.getElementById("doctorForm");

// function handleDoctorFormSubmit(event) {
//   if (!doctorForm.checkValidity()) {
//     event.preventDefault();
//     event.stopPropagation();
//   }

//   doctorForm.classList.add("was-validated");
// }

// doctorForm.addEventListener("submit", handleDoctorFormSubmit)
// })();

