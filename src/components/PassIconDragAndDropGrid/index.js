import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/es/Icon';
import IconButton from '@material-ui/core/es/IconButton';
import GridList from '@material-ui/core/es/GridList';
import GridListTile from '@material-ui/core/es/GridListTile';
import { DragDropContext } from 'react-dnd';
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import DraggablePassIcon from '../DraggablePassIcon';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centerAlign: {
    textAlign: 'center',
  },
  grid: {
    width: 255,
    height: 350,
  },
  button: {
    display: 'inline-block',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  icon: {
    fontSize: 48,
    color: 'rgb(0, 0, 0)',
    opacity: 0.5,
  },
});

class PassIconDragAndDropGrid extends React.Component {
  constructor(props) {
    super(props);
    this.previewGenerator = this.previewGenerator.bind(this);
  }

  previewGenerator(itemType, item, style) {
    const { classes } = this.props;

    return (
      <div style={style}>
        <div className={classes.centerAlign}>
          <IconButton
            disableRipple
            disableTouchRipple
            className={classes.button}
          >
            <Icon className={classes.icon}>{item.passIcon}</Icon>
          </IconButton>
        </div>
      </div>
    );
  }

  render() {
    const { classes, passIcons, pairIcon, error } = this.props;

    const passIconGrid = passIcons.map(passIcon => (
      <GridListTile key={passIcon}>
        <DraggablePassIcon passIcon={passIcon} pairIcon={pairIcon} />
      </GridListTile>
    ));

    return (
      <div className={classes.root}>
        <GridList
          style={{
            backgroundColor: error ? 'rgba(255, 0, 0, 0.2)' : '',
          }}
          cellHeight={75}
          className={classes.grid}
          cols={3}
        >
          {passIconGrid}
        </GridList>
        <Preview generator={this.previewGenerator} />
      </div>
    );
  }
}

PassIconDragAndDropGrid.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  passIcons: PropTypes.arrayOf(PropTypes.string),
  pairIcon: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default DragDropContext(MultiBackend(HTML5toTouch))(
  withStyles(styles)(PassIconDragAndDropGrid)
);
