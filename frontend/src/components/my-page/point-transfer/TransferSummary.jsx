import React from 'react';

function TransferSummary({ amount, pointBalance }) {
  return (
    <ul>
      <li>
        <span>송금할 그루</span>
        <span>{Number(amount).toLocaleString() || 0}그루</span>
      </li>
      <li>
        <span>송금 후 잔액</span>
        <span>{(pointBalance - (amount || 0))?.toLocaleString()}그루</span>
      </li>
    </ul>
  );
}

export default TransferSummary;
