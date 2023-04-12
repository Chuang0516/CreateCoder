export const setTicket = (ticket) => {
  localStorage.setItem('Coder_Ticket', ticket)
}

export const getTicket = () => localStorage.getItem('Coder_Ticket')

export const removeTicket = () => {
  localStorage.removeItem('Coder_Ticket')
}
