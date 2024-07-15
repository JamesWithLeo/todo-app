interface INewTodo {
  isVisible: boolean;
}

const newTodo = ({ isVisible }: INewTodo): JSX.Element => {
  return (
    <>
      <h1>TItle :</h1>
      <input type="text" />
    </>
  );
};
export default newTodo;
