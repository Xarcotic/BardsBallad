import { memo } from 'react'

import {
  Handle,
  type NodeProps,
  type Node,
  Position,
  useReactFlow
} from '@xyflow/react'

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
 
function ConcatString({ id, data: { string1, string2 } }: NodeProps<Node<{ string1: string; string2: string; }>>) {
  const { updateNodeData } = useReactFlow()

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Concat String</IonCardTitle>
      </IonCardHeader>
      <Handle type='target' id='prev-node' position={Position.Left}
        style={{ top: 30, bottom: 'auto' }}
      />
      <Handle type='source' id='next-node' position={Position.Right}
        style={{ top: 30, bottom: 'auto' }}
      />

      <IonCardContent>
        <p style={{ marginTop: 5 }}>
          String 1
        </p>
        <p style={{ marginTop: 5 }}>
          String 2
        </p>

        <p style={{ textAlign: 'right', marginTop: 5 }}>
          (string) concated string
        </p>
      </IonCardContent>

      <Handle type='target' id='string1-string' position={Position.Left}
        style={{ top: 85, bottom: 'auto' }}
      />
      <Handle type='target' id='string2-string' position={Position.Left}
        style={{ top: 110, bottom: 'auto' }}
      />
      
      <Handle type='source' id='output-string' position={Position.Right}
        style={{ top: 136, bottom: 'auto' }}
      />
    </IonCard>
  )
}
 
export default memo(ConcatString)