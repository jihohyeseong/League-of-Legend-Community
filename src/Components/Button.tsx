import styled from "styled-components";
import React from "react";

type ButtonVariant = 'edit' | 'delete' | 'cancel' | 'input';

interface ButtonProps {
    variant: ButtonVariant;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

const Button = styled.button<{ variant: ButtonVariant }>`
  border-radius: ${props => props.variant === 'input' ? '1rem' : props.variant === 'cancel' ? '3rem' : '5rem'};
  padding: ${props => props.variant === 'input' ? '0.5rem' : props.variant === 'cancel' ? '0.5rem' : '0.3rem'};
  border: 1px solid ${(props) => props.variant === 'edit' ? 'green' : props.variant === 'delete' ? 'crimson' : props.variant === 'cancel' ? 'crimson' : 'transparent'};
  background-color: ${(props) => props.variant === 'edit' ? 'green' : props.variant === 'delete' ? 'crimson' : props.variant === 'cancel' ? 'crimson' : 'transparent'};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => props.variant !== 'input' && props.theme.bgColor};
    border: 1px solid ${(props) => props.variant !== 'input' && props.theme.bgColor};
    color: ${props => props.variant === 'input' && 'steelblue'};
  }
`;

export const CustomButton = ({ variant, onClick, children, type = 'button' }: ButtonProps) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            type={type}
        >
            {children}
        </Button>
    );
};