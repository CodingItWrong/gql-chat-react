import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOAD_MESSAGES_QUERY = gql`
  query {
    messages {
      id
      text
    }
  }
`

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription restaurantAdded {
    messageSent {
      id
      text
    }
  }
`

const updateQuery = (previousResult, { subscriptionData }) => {
  console.log({ previousResult, subscriptionData })
  const newMessage = { ...subscriptionData.data.messageSent }
  return {
    messages: [...previousResult.messages, newMessage],
  }
}

function Conversation() {
  const { loading, error, data, subscribeToMore } = useQuery(
    LOAD_MESSAGES_QUERY,
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery,
    })
  }, [])
  /* eslint-enable  */

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <ul>
        {data.messages.map(message => (
          <li key={message._id}>{message.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Conversation
