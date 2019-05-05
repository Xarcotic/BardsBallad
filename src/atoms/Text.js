import styled, { css } from 'styled-components';

const Text = styled.p`
  display: inline;
  ${props => props.width && css` width: ${props => props.width}; `}
  color: ${props => props.theme[props.color] || props.theme.text};
  ${props => props.size && css` font-size: ${props => props.size}; `}
  font-family: ${props => props.sub ? 'Nunito' : 'OpenSans' };
  font-weight: ${props => props.weight || '200'};

  ${props => props.align && css` text-align: ${props => props.align}; `}
  ${props => props.lineHeight && css` line-height: ${props => props.lineHeight}; `}

  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  ${props => props.float && css` float: ${props => props.float}; `}

  ${props => props.flowWrap && css`
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  `}

  ${props => props.hover && css`
    &:hover {
      color: ${props => props.theme[props.hover]};
    }
  `}
`

export default Text;