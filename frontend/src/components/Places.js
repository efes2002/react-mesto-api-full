import React from 'react';
import withProtectedRoute from "../hoc/withProtectedRoute";


function Places({cardsElement}) {

  return (
    <section className="places">
      <ul className="places__elements">
        {cardsElement}
      </ul>
    </section>
  )
}

export default withProtectedRoute(Places);
