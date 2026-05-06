import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

function Editor({ onUpdate }){
    let editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
            placeholder: 'Start typing here...'
        })
        ],
        content: '',
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML())
        }
    })

    return(
        <div style={{ 
                 border: '1px solid #ccc', 
                borderRadius: '8px', 
                padding: '10px', 
                width: '100%', 
                maxWidth: '100%',
                height: '300px',      
                overflowX: 'hidden',
                overflowY: 'auto',   
                boxSizing: 'border-box' 
            }}>
            <EditorContent editor={editor}/>
            
        </div>
    )
}

export default Editor