// 1. Basics & Setup
console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
  alert("Page fully loaded!");
});

// Sample event data array with categories for filtering
class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }

  checkAvailability() {
    return this.seats > 0 && new Date(this.date) > new Date();
  }
}

// 5. Objects and Prototypes - Event class above with method checkAvailability

// Initial events array
const events = [
  new Event("Music Fest", "2025-06-15", 5, "Music"),
  new Event("Book Reading", "2025-04-10", 0, "Education"),
  new Event("Tree Plantation", "2025-07-01", 10, "Environment"),
];

// 2. Syntax, Data Types, Operators example usage
const eventName = events[0].name;
const eventDate = events[0].date;
let seats = events[0].seats;
console.log(`Event: ${eventName} on ${eventDate} with ${seats} seats available.`);

// 6. Arrays and Methods
// Add a new event
function addEvent(eventList, event) {
  eventList.push(event);
}
addEvent(events, new Event("Workshop on Baking", "2025-08-12", 20, "Workshop"));

// Filter music events
const musicEvents = events.filter(e => e.category === "Music");

// Map event names formatted
const eventNames = events.map(e => `${e.name} on ${e.date}`);
console.log("Event Names:", eventNames);

// 7. DOM Manipulation - render events dynamically
const eventContainer = document.querySelector("#eventsContainer");
function renderEvents(eventList) {
  eventContainer.innerHTML = ""; // Clear previous
  eventList.forEach(event => {
    if (event.checkAvailability()) {
      const card = document.createElement("div");
      card.className = "eventCard";
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Seats left: ${event.seats}</p>
        <p>Category: ${event.category}</p>
        <button class="registerBtn">Register</button>
      `;
      eventContainer.appendChild(card);

      // 8. Event Handling - register button
      card.querySelector(".registerBtn").onclick = () => {
        registerUser(event);
        renderEvents(events); // Update UI after registration
      };
    }
  });
}
renderEvents(events);

// 3. Conditionals, Loops, and Error Handling
function registerUser(event) {
  try {
    if (!event.checkAvailability()) {
      throw new Error("No seats available or event is past.");
    }
    event.seats--;
    alert(`Registered for ${event.name}! Seats left: ${event.seats}`);
  } catch (error) {
    alert(error.message);
  }
}

// 4. Functions, Scope, Closures, Higher-Order Functions

// Closure to track total registrations per category
function registrationTracker(category) {
  let count = 0;
  return function () {
    count++;
    console.log(`Total registrations for ${category}: ${count}`);
  };
}
const trackMusicReg = registrationTracker("Music");

// Filter events by category with callback to render
function filterEventsByCategory(events, category, callback) {
  const filtered = events.filter(e => e.category === category);
  callback(filtered);
}

// 8. Event Handling for category filter
const filterCategory = document.querySelector("#filterCategory");
if (filterCategory) {
  filterCategory.addEventListener("change", e => {
    const category = e.target.value;
    if (category === "all") {
      renderEvents(events);
    } else {
      filterEventsByCategory(events, category, renderEvents);
    }
  });
}

// 8. Event Handling for quick search
const searchInput = document.querySelector("#searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const search = e.target.value.toLowerCase();
      const foundEvents = events.filter(ev => ev.name.toLowerCase().includes(search));
      renderEvents(foundEvents);
    }
  });
}

// 9. Async JS, Promises, Async/Await - mock fetch events (using setTimeout here)
async function fetchEventsMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Event("Mock Event 1", "2025-09-01", 15, "Mock"),
        new Event("Mock Event 2", "2025-10-10", 0, "Mock"),
      ]);
    }, 1000);
  });
}

// Call and render after fetch mock
async function loadMockEvents() {
  try {
    const fetchedEvents = await fetchEventsMock();
    fetchedEvents.forEach(e => addEvent(events, e));
    renderEvents(events);
  } catch (error) {
    console.error("Failed to load events", error);
  }
}
loadMockEvents();

// 10. Modern JavaScript Features used throughout (destructuring example)
function printEventDetails({ name, date, seats }) {
  console.log(`Event: ${name}, Date: ${date}, Seats: ${seats}`);
}
printEventDetails(events[0]);

// 11. Working with Forms - registration form handling
const registrationForm = document.querySelector("#registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = registrationForm.elements["name"].value.trim();
    const email = registrationForm.elements["email"].value.trim();
    const selectedEventName = registrationForm.elements["event"].value;

    if (!name || !email || !selectedEventName) {
      alert("Please fill all fields");
      return;
    }

    const eventObj = events.find(ev => ev.name === selectedEventName);
    if (!eventObj) {
      alert("Selected event not found");
      return;
    }

    if (!eventObj.checkAvailability()) {
      alert("Event full or past");
      return;
    }

    registerUser(eventObj);
    registrationForm.reset();
  });
}

// 12. AJAX & Fetch API - Simulated POST registration
function submitRegistration(data) {
  fetch("https://mockapi.com/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(response => alert("Registration successful!"))
    .catch(err => alert("Registration failed!"));
}

// Example usage (call inside form submit or button click):
// submitRegistration({ name, email, event: selectedEventName });

// 13. Debugging & Testing - Use console logs for debugging already used above

// 14. jQuery example (optional, if jQuery loaded)
// $('#registerBtn').click(() => alert('Register button clicked'));

// Optional fadeIn/out example (requires jQuery and elements with class .eventCard)
// $('.eventCard').fadeIn(500);

// Benefit of frameworks (comment): React/Vue improve UI code maintainability with components and state management.
