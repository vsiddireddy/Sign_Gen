import bpy
import bmesh
import random

# Get a list of all objects in the scene
objects = bpy.data.objects

# Iterate over the objects and delete them
for obj in objects:
    bpy.data.objects.remove(obj)
    
# Get a list of all materials in the scene
materials = bpy.data.materials

# Iterate over the materials and delete them
for mat in materials:
    bpy.data.materials.remove(mat)

# Create a new cube
bpy.ops.mesh.primitive_cube_add()

# Select the cube
cube = bpy.context.selected_objects[0]

# Enter edit mode
bpy.ops.object.editmode_toggle()

# Select all vertices
bpy.ops.mesh.select_all(action='SELECT')

# Scale the selected vertices
bpy.ops.transform.resize(value=(2.5, 0.2, 1))
# Select the front face
bpy.ops.mesh.select_face_by_sides(number=4)

# Inset the selected face
bpy.ops.mesh.inset(thickness=0.1, depth=0, use_individual=True)

# Extrude the selected face
#bpy.ops.mesh.extrude_region_move(MESH_OT_extrude_region={"use_normal_flip":False, "use_dissolve_ortho_edges":False, "mirror":False}, TRANSFORM_OT_translate={"value":(-0, -0, -0.0644046), "orient_axis_ortho":'X', "orient_type":'NORMAL', "orient_matrix":((0, 0, 1), (1, 0, 0), (0, 1, 0)), "orient_matrix_type":'NORMAL', "constraint_axis":(False, False, True), "mirror":False, "use_proportional_edit":False, "proportional_edit_falloff":'SMOOTH', "proportional_size":1, "use_proportional_connected":False, "use_proportional_projected":False, "snap":False, "snap_elements":{'INCREMENT'}, "use_snap_project":False, "snap_target":'CLOSEST', "use_snap_self":True, "use_snap_edit":True, "use_snap_nonedit":True, "use_snap_selectable":False, "snap_point":(0, 0, 0), "snap_align":False, "snap_normal":(0, 0, 0), "gpencil_strokes":False, "cursor_transform":False, "texture_space":False, "remove_on_cancel":False, "view2d_edge_pan":False, "release_confirm":False, "use_accurate":False, "use_automerge_and_split":False})
bpy.ops.mesh.extrude_region_shrink_fatten(MESH_OT_extrude_region={"use_normal_flip":False, "use_dissolve_ortho_edges":False, "mirror":False}, TRANSFORM_OT_shrink_fatten={"value":-0.0463358, "use_even_offset":False, "mirror":False, "use_proportional_edit":False, "proportional_edit_falloff":'SMOOTH', "proportional_size":1, "use_proportional_connected":False, "use_proportional_projected":False, "snap":False, "release_confirm":False, "use_accurate":False})

# Exit edit mode
bpy.ops.object.mode_set(mode='OBJECT')

# Create a new principled BDSF shader
mat = bpy.data.materials.new("Frame")
mat.use_nodes = True
mat_output = mat.node_tree.nodes["Material Output"]
principled_node = mat.node_tree.nodes.new("ShaderNodeBsdfPrincipled")
mat.node_tree.links.new(principled_node.outputs[0], mat_output.inputs[0])

# Assign the new shader to the cube
cube.active_material = mat

# Set the cube's principled BDSF color
principled_node.inputs[0].default_value = (0.3, 0.3, 0.3, 1)

# Create a new principled BDSF shader
mat2 = bpy.data.materials.new("Sign")
mat2.use_nodes = True
mat2_output = mat2.node_tree.nodes["Material Output"]
principled_node2 = mat2.node_tree.nodes.new("ShaderNodeBsdfPrincipled")
mat2.node_tree.links.new(principled_node2.outputs[0], mat2_output.inputs[0])

# Generate a random principled BDSF color
r = random.uniform(0, 1)
g = random.uniform(0, 1)
b = random.uniform(0, 1)

# Set the cube's principled BDSF color
principled_node2.inputs[0].default_value = (r, g, b, 1)

# Enter edit mode
bpy.ops.object.editmode_toggle()

# Assign the materials to the object
cube.data.materials.append(mat2)

# Assign the second material to the active face
bpy.context.object.active_material_index = 1
bpy.ops.object.material_slot_assign()

# Exit edit mode
bpy.ops.object.mode_set(mode='OBJECT')
        
