
import EditTypeModal from '../../modals/EditType'
import { useState } from 'react'
import EditStringModal from '../../modals/EditString'
import AccordionGroup from '../../components/AccordionGroup'
import FloatingActionButton from '../../components/FloatingActionButton'
import Button from '../../components/inputs/Button'
import Accordion from '../../components/Accordion'
import { addSystemType, addTypeProperty, deleteSystemType, deleteTypeProperty, renameSystemType, updateTypeProperty } from '../../storage/methods/systems'

import { type System, type TypeData } from '../../storage/schemas/system'

type TypesProps = {
  system: System
}

const Types: React.FC<TypesProps> = ({ system }) => {
  const [editData, setEditData] = useState<{
    key: string;
    typeData: TypeData;
    typeName: string;
  } | null>(null)

  const [editName, setEditName] = useState<string | null>(null)

  const [openAccordion, setOpenAccordion] = useState(-1)

  return (
    <>
      <EditTypeModal data={editData} isOpen={editData !== null}
        requestClose={() => setEditData(null)}
        onSave={(data) => updateTypeProperty(system.local_id, editData?.typeName || '', editData?.key || '', data)}
        onDelete={() => deleteTypeProperty(system.local_id, editData?.typeName || '', editData?.key || '')}
      />

      <EditStringModal data={editName} isOpen={editName !== null}
        requestClose={() => setEditName(null)}
        onSave={(data) => renameSystemType(system.local_id, editName || '', data)}
      />
      
      {/* TODO: Searchbar */}

      <AccordionGroup>
        {system?.types.map((type, i) => (
          <Accordion key={type.name} id={type.name} title={type.name} isOpen={openAccordion === i} toggleState={shouldOpen => setOpenAccordion(shouldOpen ? i : -1)}>
            <div>
              <Button color='light' onClick={() => setEditName(type.name)}>Edit Name</Button>

              <Button color='light' onClick={async () => {
                const propertyType = await addTypeProperty(system.local_id, type.name)

                if (!propertyType) return

                setEditData({ ...propertyType, typeName: type.name })
              }}>Add Property</Button>

              <Button color='danger' onClick={() => deleteSystemType(system.local_id, type.name)}>Delete Type</Button>
            </div>

            <div className='flex flex-col gap-1 mt-3'>
              {
                type.properties.map((t) => (
                  <div key={t.key}
                    className='p-3 border border-neutral-600 dark:bg-neutral-800 hover:bg-neutral-700 cursor-pointer'
                    onClick={() => setEditData({ ...t, typeName: type.name })}
                  >
                    <p>
                      {t.key} - {t.typeData.type} {t.typeData.isArray ? '(Array)' : ''} {t.typeData.options?.join(',')}
                    </p>
                  </div>
                ))
              }
            </div>
          </Accordion>
        ))}
      </AccordionGroup>

      <FloatingActionButton onClick={async () => {
        await addSystemType(system.local_id, 'New Type')
        setEditName('New Type')
      }} />
    </>
  )
}

export default Types