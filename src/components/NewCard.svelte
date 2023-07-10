<script lang="ts">
    import Modal from "./Modal.svelte";

    export let is_virtual : boolean = false;
    let modal_toggle : boolean = false;

    const handleNewCard = () => {
        console.log('criando cartão...');
        modal_toggle = true;
    }

</script>

<button class="btn-secondary-small" on:click={handleNewCard}>Novo Cartão { is_virtual ? 'Virtual' : 'Físico'}</button>
<Modal  modal_toggle={modal_toggle}>
    <img src="./src/assets/new_card.svg" alt="new_card" />
    <p class="text-modal">Cartão criado com suceso!</p>
    <button class="btn-primary" on:click={ () => {modal_toggle = false} }>ok</button>
</Modal>

<style lang="scss">

.btn-secondary-small{
    z-index: 1;
    border-radius: .8rem;
    padding: .8rem 1.6rem;
    border: 1px solid var(--c-white);
    background-color: transparent;
    gap: 1.6rem;
    
    color: var(--c-white);
    font-size: 1.2rem;
    font-weight: var(--s-regular);
    line-height: 120%;
    cursor: pointer;
    transition: all ease-out .3s;

    &:hover,
    &:focus
    {
        transform: scale(1.02);
        background-color: var(--c-purple-blue);
        border-color: var(--c-palatinate-blue);
        font-weight: var(--s-semi-bold);
    }

    &:focus{
        background-color: var(--c-palatinate-blue);
    }
}

.btn-primary{
    border: none;
    border-radius: 1rem;
    padding: 1.35rem 1rem;
    background-color: var(--c-purple-blue);

    color: var(--c-white);
    font-size: 1.4rem;
    font-weight: var(--s-regular);
    line-height: 120%;
    width: 100%;
    cursor: pointer;

    &:hover,
    &:focus{
        background-color: var(--c-palatinate-blue);
        transform: scale(1.02);
        font-weight: var(--s-semi-bold);
    }
}

.text-modal{
    font-size: 2rem;
    font-weight: var(--b-bold);
    line-height: 120%;
    color: var(--c-white);
}
</style>