import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
  }

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  a {
    text-decoration: none;
    color: #7951c1;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: left;
    width: 100%;
  }
`;
export const IssueList = styled.ul`
  ${props =>
    !props.loadingIssues &&
    css`
      display: none;
    `}
  list-style: none;
  margin-top: 30px;
  border-top: 1px solid #eee;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #eee;
    margin-right: 20px;
  }
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }
  div {
    flex: 1;
    margin-left: 15px;
    strong {
      font-size: 16px;
      a {
        text-decoration: none;
        color: #333;
      }
      &:hover {
        color: #7159c1;
      }
    }

    p {
      color: #999;
    }
    span {
      background: #eee;
      color: #333;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 600;
      height: 16px;
      align-items: center;
      margin-left: 15px;
      padding: 2px 5px;
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
`;
export const FilterButton = styled.button`
  padding: 10px 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 14px;
  border-radius: 10px;
  &:hover {
  }
  ${props =>
    props.Active &&
    css`
      background-color: #9159c1;
      color: #eee;
    `}
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  button {
    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
export const Select = styled.select`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 10px 4px;
`;
