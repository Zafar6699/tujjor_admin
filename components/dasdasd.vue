<template>
    <ul class="tree-list">
        <node-tree :node="tree"></node-tree>
    </ul>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
    props: {
        tree: Object
    },
    components: {
        NodeTree
    }
};
</script>

<style>
.tree-list ul {
    padding-left: 16px;
    margin: 6px 0;
}
</style>
