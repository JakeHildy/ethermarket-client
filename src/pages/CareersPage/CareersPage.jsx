import React, { Component } from 'react';
import './CareersPage.scss';

export class CareersPage extends Component {
  render() {
    return (
      <div className="careers-page">
        <h1 className="careers-page__title">Current opportunities</h1>
        <p className="careers-page__paragraph">
          <span className="careers-page__span">
            EtherMarket works in a distributed-first environment, which means that you have the flexibility to work
            where you want.
          </span>{' '}
          Join us in our Vancouver HQ (once we open our office), choose to work from home, or join our distributed team
          of HODLers located all across Canada! Wherever you are, you’ll be supported by the tools, systems, and team to
          help you do your best work.
        </p>
        <p className="careers-page__paragraph">
          At EtherMarket, you’ll find exceptional teammates, meaningful work, and amazing growth opportunities. We’re on
          a mission to impact the world through decentralized web applications and we’re looking for talented and
          passionate people to help us do that. Are you ready to join us?
        </p>
      </div>
    );
  }
}

export default CareersPage;
