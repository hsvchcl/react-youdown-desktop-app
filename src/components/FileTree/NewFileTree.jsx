import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

export const NewFileTree = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);

  return (
    <FolderTree
      data={ testData }
      onChange={ onTreeStateChange }
    />
  );
};