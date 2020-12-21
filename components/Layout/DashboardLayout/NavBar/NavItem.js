import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavItem({
  title,
  href,
  depth,
  children,
  icon: Icon,
  className,
  open: openProp,
  info: Info,
  ...rest
}) {
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        disableGutters
        key={title}
        {...rest}
      >
        <Button
          onClick={handleToggle}
          style={style}
        >
          {Icon && (
            <Icon
              size="20"
            />
          )}
          <span >
            {title}
          </span> 
        </Button>
        <Collapse in={open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        // activeClassName={classes.active}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && (
          <Icon
            size="20"
          />
        )}
        <span >
          {title}
        </span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  info: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  open: false
};

export default NavItem;
