import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SEND_MESSAGE_MUTATION = gql`
  mutation($text: String!) {
    sendMessage(text: $text) {
      _id
      text
    }
  }
`

function NewMessageForm() {
  const [messageText, setMessageText] = useState('')
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION)

  const handleChange = e => setMessageText(e.target.value)

  const sendMessage = e => {
    e.preventDefault()
    sendMessageMutation({ variables: { text: messageText } })
    setMessageText('')
  }

  return (
    <form onSubmit={sendMessage}>
      <input type="text" value={messageText} onChange={handleChange} />
      <button>Send</button>
    </form>
  )
}

export default NewMessageForm
