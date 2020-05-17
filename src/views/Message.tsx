import React from 'react';
import { useParams } from 'react-router-dom';
import { useMessageQuery } from 'queries/MessageQuery';
import { MessageQuery } from 'types/MessageQuery';
import { useAuth0 } from 'react-auth0-spa';
import HandleErrorLoading from 'components/HandleErrorLoading';

function ShowMessage(data: MessageQuery) {
  if (data.inquiries.length === 0) return null;
  const msg = data.inquiries[0];
  return (
    <div>
      <h3>Subject: '{msg.title||'?'}'</h3>
      <h4>{msg.file_name}, {msg.year}</h4>
      <hr />
      <p>
        <pre>
        {data.inquiries[0].text}
        </pre>
        </p>
    </div>
  );
}

function Message() {
  const { id } = useParams();
  // const { user } = useAuth0();
  const { data, loading, error } = useMessageQuery(id);
  return HandleErrorLoading<MessageQuery>(data, loading, error, ShowMessage);
}

export default Message;
