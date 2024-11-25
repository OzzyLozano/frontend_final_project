const crossSvg = `<svg class="w-6 h-6 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg>`
const checkSvg = `<svg class="w-6 h-6 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" /></svg>`

// links constants
const goToEvent = document.getElementById('event')
const goToParticipants = document.getElementById('participants')
const goToInvitations = document.getElementById('invitations')
const goToLogistic = document.getElementById('logistic')
const goToConfirmation = document.getElementById('confirmation')
// forms constants
const eventForm = document.getElementById('event-form')
const participantsForm = document.getElementById('participants-form')
const invitationsForm = document.getElementById('invitations-form')
const logisticForm = document.getElementById('logistic-form')
const confirmationBtn = document.getElementById('confirmation-btn')

goToEvent.addEventListener('click', () => {
  eventForm.classList.remove('hide')
  participantsForm.classList.add('hide')
  invitationsForm.classList.add('hide')
  logisticForm.classList.add('hide')
  confirmationBtn.classList.add('hide')
  goToEvent.classList.add('hide')
  goToParticipants.classList.remove('hide')
  goToInvitations.classList.add('hide')
  goToLogistic.classList.add('hide')
  goToConfirmation.classList.add('hide')
})

// event registration checks by div
let title = false
let type = false
let description = false
let eventLocationBool = false
let date = false
let hour = false
let eventBool = false

function checkEventRegistration() {
  if (title && type && description && eventLocationBool && date && hour) {
    goToParticipants.classList.remove('unavailable')
    eventBool = true
  } else {
    goToParticipants.classList.add('unavailable')
    eventBool = false
  }
}
function addSvg(elementDiv, element, limit) {
  elementDiv.removeChild(elementDiv.lastElementChild)
  if (element.value.trim() == '' || element.value.length > limit) {
    elementDiv.insertAdjacentHTML('beforeend', crossSvg)
    return false
  } else {
    elementDiv.insertAdjacentHTML('beforeend', checkSvg)
    return true
  }
}

let eventTitleDiv = document.getElementById('event-title-div')
let eventTitle = document.getElementById('event-title')
eventTitle.addEventListener('input', () => {
  title = addSvg(eventTitleDiv, eventTitle, 40)
  checkEventRegistration()
})

let eventTypeDiv = document.getElementById('event-type-div')
let eventType = document.getElementById('event-type')
eventType.addEventListener('input', () => {
  eventTypeDiv.removeChild(eventTypeDiv.lastElementChild)
  if (eventType.value.trim() == '--Tipo de Evento--') {
    eventTypeDiv.insertAdjacentHTML('beforeend', crossSvg)
    type = false
  } else {
    eventTypeDiv.insertAdjacentHTML('beforeend', checkSvg)
    type = true
  }
  checkEventRegistration()
})

let eventDescriptionDiv = document.getElementById('event-description-div')
let eventDescription = document.getElementById('event-description')
function handleDesctiption() {
  description = addSvg(eventDescriptionDiv, eventDescription, 160)
  checkEventRegistration()
}

let eventLocationDiv = document.getElementById('event-location-div')
let eventLocation = document.getElementById('event-location')
eventLocation.addEventListener('input', () => {
  eventLocationBool = addSvg(eventLocationDiv, eventLocation, 40)
  checkEventRegistration()
})

let eventDateDiv = document.getElementById('event-date-div')
let eventDate = document.getElementById('event-date')
eventDate.addEventListener('input', () => {
  date = addSvg(eventDateDiv, eventDate, 40)
  checkEventRegistration()
})

let eventHourDiv = document.getElementById('event-hour-div')
let eventHour = document.getElementById('event-hour')
eventHour.addEventListener('input', () => {
  let eventHourList = String(eventHour.value).split(':')
  eventHourDiv.removeChild(eventHourDiv.lastElementChild)
  if (Number(eventHourList[0]) < 0 || Number(eventHourList[0]) > 24) {
    eventHourDiv.insertAdjacentHTML('beforeend', crossSvg)
    hour = false
  }
  else {
    eventHourDiv.insertAdjacentHTML('beforeend', checkSvg)
    hour = true
  }
  checkEventRegistration()
})

let eventData = {
  title: String,
  type: String,
  description: String,
  location: String,
  date: String,
  hour: String
}

// links functionality
goToParticipants.addEventListener('click', e => {
  e.preventDefault()
  // code for adding title availability
  // if (eventTitle.value) {
  //   const url = `disponibilidad?titulo=${eventTitle.value}`
  //   window.location.href = url
  // } else {
  //   alert('Ingrese un titulo')
  // }
  eventData = {
    title: eventTitle.value,
    type: eventType.value,
    description: eventDescription.value,
    location: eventLocation.value,
    date: eventDate.value,
    hour: eventHour.value
  }
  if (eventBool) {
    eventForm.classList.add('hide')
    participantsForm.classList.remove('hide')
    invitationsForm.classList.add('hide')
    logisticForm.classList.add('hide')
    confirmationBtn.classList.add('hide')
    goToEvent.classList.remove('hide')
    goToParticipants.classList.add('hide')
    goToInvitations.classList.remove('hide')
    goToLogistic.classList.add('hide')
    goToConfirmation.classList.add('hide')
  }
})

// participant variables
let participants = false
let nameParticipant = false
let lastname = false
let emailParticipant = false
let phoneParticipant = false
let role = false

let emailEnds = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
function checkParticipantRegistration() {
  if (nameParticipant && lastname && emailParticipant && phoneParticipant && role) {
    goToInvitations.classList.remove('unavailable')
    participants = true
  } else {
    goToInvitations.classList.add('unavailable')
    participants = false
  }
}
function verifyEmail(_email) {
  if (_email.includes('@')) {
    const email = _email.split('@')
    for (end of emailEnds) {
      if (email[1] == end) return true
    }
    return false
  }
}

let participantNameDiv = document.getElementById('participant-name-div')
let participantName = document.getElementById('participant-name')
participantName.addEventListener('input', () => {
  nameParticipant = addSvg(participantNameDiv, participantName, 40)
  checkParticipantRegistration()
})
let participantLastnameDiv = document.getElementById('participant-lastname-div')
let participantLastname = document.getElementById('participant-lastname')
participantLastname.addEventListener('input', () => {
  lastname = addSvg(participantLastnameDiv, participantLastname, 40)
  checkParticipantRegistration()
})
let participantEmailDiv = document.getElementById('participant-email-div')
let participantEmail = document.getElementById('participant-email')
participantEmail.addEventListener('input', () => {
  participantEmailDiv.removeChild(participantEmailDiv.lastElementChild)
  if (verifyEmail(participantEmail.value.trim())) {
    participantEmailDiv.insertAdjacentHTML('beforeend', checkSvg)
    emailParticipant = true
  } else {
    participantEmailDiv.insertAdjacentHTML('beforeend', crossSvg)
    emailParticipant = false
  }
  checkParticipantRegistration()
})
let participantPhoneDiv = document.getElementById('participant-phone-div')
let participantPhone = document.getElementById('participant-phone')
participantPhone.addEventListener('input', () => {
  participantPhoneDiv.removeChild(participantPhoneDiv.lastElementChild)
  if (participantPhone.value.trim() == '' || participantPhone.value.length < 10 || participantPhone.value.length > 10) {
    participantPhoneDiv.insertAdjacentHTML('beforeend', crossSvg)
    phoneParticipant = false
  } else {
    participantPhoneDiv.insertAdjacentHTML('beforeend', checkSvg)
    phoneParticipant = true
  }
  checkParticipantRegistration()
})
let participantRoleDiv = document.getElementById('role-div')
let participantRole = document.getElementById('role')
participantRole.addEventListener('input', () => {
  participantRoleDiv.removeChild(participantRoleDiv.lastElementChild)
  if (participantRole.value.trim() == '--Rol--') {
    participantRoleDiv.insertAdjacentHTML('beforeend', crossSvg)
    role = false
  } else {
    participantRoleDiv.insertAdjacentHTML('beforeend', checkSvg)
    role = true
  }
  checkParticipantRegistration()
})

let participantData = {
  nameParticipant: String,
  lastname: String,
  emailParticipant: String,
  phoneParticipant: Number,
  role: String
}
goToInvitations.addEventListener('click', e => {
  e.preventDefault()
  participantData = {
    nameParticipant: participantName.value,
    lastname: participantLastname.value,
    emailParticipant: participantEmail.value,
    phoneParticipant: parseInt(participantPhone.value, 10),
    role: participantRole.value
  }
  if (participants) {
    eventForm.classList.add('hide')
    participantsForm.classList.add('hide')
    invitationsForm.classList.remove('hide')
    logisticForm.classList.add('hide')
    confirmationBtn.classList.add('hide')
    goToEvent.classList.add('hide')
    goToParticipants.classList.remove('hide')
    goToInvitations.classList.add('hide')
    goToLogistic.classList.remove('hide')
    goToConfirmation.classList.add('hide')
  }
})

// invitations form
let invitations = false
let nameInvitation = false
let emailInvitation = false
let typeInvitation = false

function checkInvitationsRegistration() {
  if (nameInvitation && emailInvitation && typeInvitation) {
    goToLogistic.classList.remove('unavailable')
    invitations = true
  } else {
    goToLogistic.classList.add('unavailable')
    invitations = false
  }
}

let invitationsNameDiv = document.getElementById('invitation-name-div')
let invitationsName = document.getElementById('invitation-name')
invitationsName.addEventListener('input', () => {
  nameInvitation = addSvg(invitationsNameDiv, invitationsName, 40)
  checkInvitationsRegistration()
})
let invitationEmailDiv = document.getElementById('invitation-email-div')
let invitationEmail = document.getElementById('invitation-email')
invitationEmail.addEventListener('input', () => {
  invitationEmailDiv.removeChild(invitationEmailDiv.lastElementChild)
  if (verifyEmail(invitationEmail.value.trim())) {
    invitationEmailDiv.insertAdjacentHTML('beforeend', checkSvg)
    emailInvitation = true
  } else {
    invitationEmailDiv.insertAdjacentHTML('beforeend', crossSvg)
    emailInvitation = false
  }
  checkInvitationsRegistration()
})
let invitationTypeDiv = document.getElementById('invitation-type-div')
let invitationType = document.getElementById('invitation-type')
invitationType.addEventListener('input', () => {
  invitationTypeDiv.removeChild(invitationTypeDiv.lastElementChild)
  if (invitationType.value.trim() == '--Tipo de Invitación--') {
    invitationTypeDiv.insertAdjacentHTML('beforeend', crossSvg)
    typeInvitation = false
  } else {
    invitationTypeDiv.insertAdjacentHTML('beforeend', checkSvg)
    typeInvitation = true
  }
  checkInvitationsRegistration()
})

let invitationData = {
  nameInvitation: String,
  emailInvitation: String,
  typeInvitation: String
}
goToLogistic.addEventListener('click', e => {
  e.preventDefault()
  invitationData = {
    nameInvitation: invitationsName.value,
    emailInvitation: invitationEmail.value,
    typeInvitation: invitationType.value
  }

  if (invitations) {
    eventForm.classList.add('hide')
    participantsForm.classList.add('hide')
    invitationsForm.classList.add('hide')
    logisticForm.classList.remove('hide')
    confirmationBtn.classList.add('hide')
    goToEvent.classList.add('hide')
    goToParticipants.classList.add('hide')
    goToInvitations.classList.remove('hide')
    goToLogistic.classList.add('hide')
    goToConfirmation.classList.remove('hide')
  }
})

// logistic form
let logistic = false
let typeLogistic = false
let provider = false
let comments = false

function checkLogisticsRegistration() {
  if (typeLogistic && provider && comments) {
    goToConfirmation.classList.remove('unavailable')
    logistic = true
  } else {
    goToConfirmation.classList.add('unavailable')
    logistic = false
  }
}

let logisticTypeDiv = document.getElementById('logistic-type-div')
let logisticType = document.getElementById('logistic-type')
logisticType.addEventListener('input', () => {
  logisticTypeDiv.removeChild(logisticTypeDiv.lastElementChild)
  if (logisticType.value.trim() == '--Tipo de Logística--') {
    logisticTypeDiv.insertAdjacentHTML('beforeend', crossSvg)
    typeLogistic = false
  } else {
    logisticTypeDiv.insertAdjacentHTML('beforeend', checkSvg)
    typeLogistic = true
  }
  checkLogisticsRegistration()
})
let logisticProviderDiv = document.getElementById('logistic-provider-div')
let logisticProvider = document.getElementById('logistic-provider')
logisticProvider.addEventListener('input', () => {
  provider = addSvg(logisticProviderDiv, logisticProvider, 40)
  checkLogisticsRegistration()
})
let logisticCommentsDiv = document.getElementById('logistic-comments-div')
let logisticComments = document.getElementById('logistic-comments')
logisticComments.addEventListener('input', () => {
  comments = addSvg(logisticCommentsDiv, logisticComments, 160)
  checkLogisticsRegistration()
})

let logisticData = {
  type: String,
  provider: String,
  comments: String
}
goToConfirmation.addEventListener('click', e => {
  e.preventDefault()
  logisticData = {
    type: logisticType.value,
    provider: logisticProvider.value,
    comments: logisticComments.value
  }

  if (invitations) {
    eventForm.classList.remove('hide')
    participantsForm.classList.remove('hide')
    invitationsForm.classList.remove('hide')
    logisticForm.classList.remove('hide')
    confirmationBtn.classList.remove('hide')
    goToEvent.classList.add('hide')
    goToParticipants.classList.add('hide')
    goToInvitations.classList.add('hide')
    goToLogistic.classList.remove('hide')
    goToConfirmation.classList.add('hide')
  }
  console.log(eventData, participantData, invitationData, logisticData)
})
