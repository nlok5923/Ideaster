import React from "react"
import { Card } from "semantic-ui-react"

const IdeaCard = () => {
    return (
        <Card
        link
        header='Rick Sanchez'
        meta='Scientist'
        fluid
        description={[
          'Rick is a genius scientist whose alcoholism and reckless,',
          ' nihilistic behavior are a source of concern for his family.',
        ].join('')}
      />
    )
}

export default IdeaCard;