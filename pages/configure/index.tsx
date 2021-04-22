import Link from 'next/link';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Layout from '../../components/Layout/Layout'
import useConfigureLogic from './configure.logic';
import css from './configure.module.scss';
import clx from '../../utils/Html/clx';
import { ComponentWithClassNames } from '../../types/ComponentWithClassNames';

function Handle(props: ComponentWithClassNames) {
  return (
    <span className={`${props.className ? clx(props.className) : ''} ${css.dragHandle}`}>
      &#8226;&#8226;&#8226;<br/>
      &#8226;&#8226;&#8226;
    </span>
  );
}

export default function ConfigurePage() {
  const { headers, onDragEnd } = useConfigureLogic();

  return (
    <Layout title="Sample processor">
      <Link href={'/'}>
        <a>&lt; Back</a>
      </Link>
      <h1>Configure data</h1>
      {!headers ? (
        "..."
      ) : (
        <>
          <p>Prioritise your data fields based on relative importance when matching candidates.</p>
          <ul>
            <li>Drag to reorder the fields</li>
            <li>Fields at the top have higher priority</li>
            <li>Uncheck any fields to exclude them from </li>
          </ul>
          {/*
           Sample: https://codesandbox.io/s/k260nyxq9v?file=/index.js:585-1069
          */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={css.dragCtnr}
                >
                  {headers.map((header, index) => (
                    <Draggable key={header.name} draggableId={header.name} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={clx([
                            'flex --sec-center',
                            css.draggableHeading,
                            snapshot.isDragging && css.__dragging,
                          ])}
                        >
                          {header.name}
                          <Handle className={css._handle} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </Layout>
  );
}
