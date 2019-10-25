import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Header = styled.header`
    display: block;
    text-align: center;
    align-items: center;
    margin-top: 3em;
    padding-bottom: 1em;
    width: 100%;
    max-width: 1000px;
    border-bottom: 3px solid black;
`;

const SiteTitle = styled.h1`
  margin-bottom: .2em;
`;

const Navbar = ({ siteTitle }) => (
  <Wrapper>
    <Header>
      <SiteTitle>
        <Link to="/" 
          style={{
            textDecoration: `none`,
            color: `inherit`,
          }}>
          {siteTitle}
        </Link>
      </SiteTitle>
    </Header>
  </Wrapper>
)

export default Navbar
