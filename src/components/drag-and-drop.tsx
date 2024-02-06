import React from 'react';
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & {
  children: React.ReactNode;
};

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          const props = {
            ...provided.droppableProps,
            provided,
            ref: provided.innerRef,
          };
          return React.cloneElement(children, props);
        }
        return <div></div>;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  {
    provided: DroppableProvided;
  } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, 'children'> & {
  children: React.ReactNode;
};

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          const props = {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          };
          return React.cloneElement(children, props);
        }
        return <div></div>;
      }}
    </Draggable>
  );
};
