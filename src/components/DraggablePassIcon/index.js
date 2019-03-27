import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/es/IconButton';
import Icon from '@material-ui/core/es/Icon';
import { DragSource, DropTarget } from 'react-dnd';

const styles = () => ({
  root: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    color: 'rgb(0, 0, 0)',
  },
  button: {
    display: 'inline-block',
    borderRadius: '50%',
  },
});

class DraggablePassIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { passIcon } = this.props;
    const { isDragging, connectDragSource } = this.props;
    const { canDrop, isOver, connectDropTarget } = this.props;

    const isActive = canDrop && isOver;

    return connectDropTarget(
      connectDragSource(
        <div className={classes.root}>
          <IconButton
            disableRipple
            disableTouchRipple
            style={{
              backgroundColor: isActive
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(0, 0, 0, 0)',
            }}
            className={classes.button}
          >
            <Icon
              className={classes.icon}
              style={{
                opacity: isDragging ? 0.5 : 1,
              }}
            >
              {passIcon}
            </Icon>
          </IconButton>
        </div>
      )
    );
  }
}

DraggablePassIcon.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  passIcon: PropTypes.string.isRequired,
  pairIcon: PropTypes.func.isRequired,
};

const ItemTypes = {
  ICON: 'icon',
};

const sourceSpec = {
  beginDrag(props) {
    return { passIcon: props.passIcon };
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (!dropResult || item.passIcon === dropResult.passIcon) {
      return;
    }
    component.props.pairIcon(item.passIcon, dropResult.passIcon);
  },
};

const targetSpec = {
  drop(props) {
    return { passIcon: props.passIcon };
  },
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget(ItemTypes.ICON, targetSpec, targetCollect)(
  DragSource(ItemTypes.ICON, sourceSpec, sourceCollect)(
    withStyles(styles)(DraggablePassIcon)
  )
);
