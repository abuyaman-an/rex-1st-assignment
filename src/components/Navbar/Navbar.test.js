import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, Shallow } from "enzyme";
import Navbar from "./Navbar";
import { expect } from 'chai';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe("Navbar links", () => {
    let wrapper = shallow(<Navbar />);

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

    it("should have two links, two links passed via props.", () => {
        expect(wrapper.find("ul.navbar__links li")).to.have.lengthOf(2);
    });
})