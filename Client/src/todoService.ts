import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoTypeFace } from "./App";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: string) => {
      const response = await fetch("/todo/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: todo, status: false }),
      }).then((res) => res.json().then((value) => value));
      console.log(response);
      return response;
    },

    onMutate: (variables) => {
      queryClient.refetchQueries();
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch("/todo/delete/" + id).then((res) =>
        res.json().then((value) => value),
      );
      return response;
    },
    onMutate: (variables) => {
      queryClient.setQueryData(["todos"], (todos: any) => {
        return todos.filter((todo: todoTypeFace) => todo._id !== variables);
      });
    },
  });
};

export const useMarkTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      const response: Response = await fetch(
        "/todo/strike/" + id + "/?strike=" + status,
      );
      console.log(response);
    },
    onMutate: (variables) => {
      queryClient.setQueryData(["todos"], (todos: todoTypeFace[]) => {
        return todos.map((value) => {
          if (value._id === variables.id) {
            value.status = !value.status;
          }
          return value;
        });
      });
    },
  });
};
