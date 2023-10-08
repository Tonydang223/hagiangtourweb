document.getElementById("contentFormPopUp").innerHTML = `
<div class="formWrapper">
  <div class="headerForm">
    <h2>Nộp đơn ứng tuyển tại đây</h2>
  </div>
  <form id="formInTouchPopUp" class="form">
    <div class="seperate-wrapInput">
      <div class="form-control">
        <input
          type="text"
          placeholder="Full Name"
          id="username"
          name="username"
          class="username"
        />
        <small>Error message</small>
      </div>
      <div class="form-control">
        <input type="email" placeholder="Your email" id="email" name="email" class="email"/>
        <small>Error message</small>
      </div>
    </div>
    <div class="seperate-wrapInput">
      <div class="form-control">
        <input
          type="number"
          placeholder="Phone Number"
          id="phone"
          name="phone"
          class="phone"
        />
        <small>Error message</small>
      </div>
      <div class="form-control">
        <input type="text" placeholder="Country" id="country" name="country" class="country"/>
        <small>Error message</small>
      </div>
    </div>
    <label for="date">Departure date: *</label>
    <div class="form-control">
      <input type="date" placeholder="dd/mm/yyyy" id="date" name="date" class="date" />
      <small>Error message</small>
    </div>
    <div class="form-control">
      <input
        type="text"
        placeholder="Your hostel in Ha Noi ?"
        id="hostel"
        class="hostel"
        name="hostel"
      />
      <small>Error message</small>
    </div>

    <textarea
      placeholder="Message in here ..."
      id="message"
      name="message"
      class="message"
    ></textarea>
    <div class="actionSubmitForm">
      <input class="button-5" type="submit" value="Confirm" />
      <div class="loading">
        <span class="loader"></span>
      </div>
    </div>
  </form>
</div>
`;
