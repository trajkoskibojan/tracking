import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
{
   0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: ${spin} 2s linear infinite;
  margin: 0 auto;
`;

export const Th = styled.th`
  width: 270px;
`;

export const Td = styled.td`
  display: flex;
  justify-content: space-between;
`;

export const Links = styled(Link)`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    text-decoration: none;
    color: white;
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;
