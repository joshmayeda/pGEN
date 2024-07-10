import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useState } from 'react';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { titleCase } from 'title-case';
import { Card } from './Card.tsx';

// Initialize the DynamoDB Document Client
const ddbClient = new DynamoDBClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  }
});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

type AutoComboboxProps = {
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  onCardSelect: (card: Card) => void;
  setCardNotFound: (cardNotFound: boolean) => void;
};

const AutoCombobox: React.FC<AutoComboboxProps> = ({ selectedCard, setSelectedCard, onCardSelect, setCardNotFound }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  const handleQueryChange = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      setQuery(inputValue);

      try {
        const capitalizedQuery = titleCase(query);
        const command = new QueryCommand({
          TableName: "proxy-gen",
          IndexName: "name-index",
          KeyConditionExpression: "#name = :query",
          ExpressionAttributeNames: { "#name": "name" },
          ExpressionAttributeValues: { ":query": capitalizedQuery },
        });
        const result = await ddbDocClient.send(command);

        const cardFromDynamoDB: Card[] = result.Items?.map(item => ({
          id: item.id,
          colors: item.colors,
          name: item.name,
          image: item.image_uris.border_crop,
          keywords: item.keywords,
          type_line: item.type_line,
          amount: 1,
        })) ?? [];
        setFilteredCards(cardFromDynamoDB);
        setSelectedCard(cardFromDynamoDB[0]);
        onCardSelect(cardFromDynamoDB[0]);
        console.log("Query:", capitalizedQuery);
        console.log("Filtered cards:", cardFromDynamoDB);
      } catch (err) {
        console.error("Error querying DynamoDB:", err);
        setCardNotFound(true);
      }
    } else {
      setQuery(event.currentTarget.value);
    }
  };

  return (
    <Combobox value={selectedCard} onChange={setSelectedCard} onClose={() => setQuery('')}>
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(card: Card) => card?.name}
        onKeyDown={handleQueryChange}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete='off'
        placeholder='Search for a card...'
        style={{ padding: '0.5rem' }}
      />
      <ComboboxOptions anchor="bottom" className="empty:hidden">
        {filteredCards.map((card) => (
          <ComboboxOption key={card.id} value={card} className="data-[focus]:bg-blue-100">
            {card.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default AutoCombobox;
