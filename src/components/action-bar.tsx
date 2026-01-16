import './action-bar.css';
import { useActions } from '../hooks/use-actions';

interface ActionButtonProps {
  onClick: () => void;
  icon: string;
}

interface ActionBarProps {
  id: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={icon}></i>
      </span>
    </button>
  );
};

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton onClick={() => moveCell(id, 'up')} icon="fas fa-arrow-up" />
      <ActionButton
        onClick={() => moveCell(id, 'down')}
        icon="fas fa-arrow-down"
      />
      <ActionButton onClick={() => deleteCell(id)} icon="fas fa-times" />
    </div>
  );
};

export default ActionBar;
