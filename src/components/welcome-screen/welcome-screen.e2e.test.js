import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen';

Enzyme.configure({ adapter: new Adapter() });

it(`Should welcome button be pressed`, () => {
	const onWelcomeButtonClick = jest.fn();

	const welcomeScreen = shallow(
		<WelcomeScreen errorCount={0} time={0} onWelcomeButtonClick={onWelcomeButtonClick} />
	);

	const startButton = welcomeScreen.find(`button`);
	startButton.simulate(`click`);

	expect(onWelcomeButtonClick).toHaveBeenCalledTimes(1);
});
