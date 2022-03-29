import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, Shallow } from "enzyme";
import Navbar from "./Navbar";
import { expect } from 'chai';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe("Navbar links", () => {
    const context = {
        links: []
    };


    let wrapper = shallow(<Navbar links={[]} />, { context });
    expect(wrapper.find(".navbar__link")).to.have.lengthOf.at.least(0);

    wrapper.setProps({
        links: [
            {
                name: "Homepage",
                url: "/"
            },
            {
                name: "About us",
                url: "/about"
            }
        ]
    });
    expect(wrapper.find(".navbar__link")).to.have.lengthOf.at.least(2);

});