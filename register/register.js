let participantCount = 1; // Start with 1 by default

document.addEventListener('DOMContentLoaded', () => {
  // Attach event listener to the "Add Participant" button
  const addBtn = document.getElementById('add');
  addBtn.addEventListener('click', addParticipant);

  // Attach event listener to the form submit
  const form = document.querySelector('form');
  form.addEventListener('submit', submitForm);
});

function addParticipant() {
  participantCount++;
  const addBtn = document.getElementById('add');

  // This creates a new participant section using a template string
  const sectionHTML = `
    <section class="participant${participantCount}">
      <p>Participant ${participantCount}</p>
      <div class="item">
        <label for="fname${participantCount}"> First Name<span>*</span></label>
        <input id="fname${participantCount}" type="text" name="fname${participantCount}" required />
      </div>
      <div class="item activities">
        <label for="activity${participantCount}">Activity #<span>*</span></label>
        <input id="activity${participantCount}" type="text" name="activity${participantCount}" />
      </div>
      <div class="item">
        <label for="fee${participantCount}">Fee ($)<span>*</span></label>
        <input id="fee${participantCount}" type="number" name="fee${participantCount}" />
      </div>
      <div class="item">
        <label for="date${participantCount}">Desired Date <span>*</span></label>
        <input id="date${participantCount}" type="date" name="date${participantCount}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select>
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;

  // Insert the new section before the Add button
  addBtn.insertAdjacentHTML("beforebegin", sectionHTML);
}

function submitForm(event) {
  event.preventDefault(); // Stop the form from reloading the page

  const total = totalFees();
  const name = document.getElementById('adult_name').value;
  const summary = document.getElementById('summary');
  const form = document.querySelector('form');

  form.style.display = "none";

  summary.innerHTML = successTemplate({
    name,
    count: participantCount,
    total
  });

  summary.style.display = "block";
}

function totalFees() {
  let feeInputs = document.querySelectorAll('[id^=fee]');
  feeInputs = [...feeInputs];

  return feeInputs.reduce((sum, input) => {
    const val = parseFloat(input.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
}

function successTemplate(info) {
  return `
    <h2>Thank you ${info.name} for registering.</h2>
    <p>You have registered ${info.count} participant(s) and owe $${info.total} in Fees.</p>
  `;
}
