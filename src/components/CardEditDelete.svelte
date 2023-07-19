<script lang="ts">
    import { is_empty } from "svelte/internal";
    import type CardInterface from "../interfaces/Card.interface";
    import type VirtualCardInterface from "../interfaces/VirtualCard.interface";
    import Modal from "./Modal.svelte";

    export let card : CardInterface;
    export let card_virtual : VirtualCardInterface | undefined = undefined;
    export let is_edit_delete : boolean = false;
    
    let modal_visu_toggle: boolean = false;
    let modal_delete_toggle: boolean = false;

    const handleVisu = () => {
        modal_visu_toggle = true;
    };
    
    const handleDelete = () => {
        modal_delete_toggle = true;
    };
</script>

{#if is_edit_delete}
    <div class="card-hover d-flex flex-col justify-center">
        <button on:click={handleVisu}>Detalhes</button>
        <button on:click={handleDelete}>Excluir</button>
    </div>

    <!-- Modal Visualizar Cartão -->
    <Modal modal_toggle={modal_visu_toggle}>
        <div class="d-flex w-100 justify-end">
            <img src="./src/assets/icons/clear.svg" height=16 alt="clear" 
            on:click={() => {modal_visu_toggle = false;}}   /> 
        </div>
        <div class="d-flex flex-col w-100">
            <p class="p-modal">Nome do Titular</p>
            <p class="p-modal-input">{card.titular}</p>
        </div>
        <div class="d-flex flex-col w-100">
            <p class="p-modal">Número do Cartão</p>
            <p class="p-modal-input">{(typeof card_virtual == "undefined" ? card.number : card_virtual.number)
                .toString()
                .match(/.{1,4}/g)
                .join(" ")}</p>
        </div>
        <div class="d-flex w-100">
            <div class="d-flex flex-col w-100">
                <p class="p-modal">Vencimento</p>
                <p class="p-modal-input">{card.valid}</p>
            </div>
            <div class="d-flex flex-col w-100">
                <p class="p-modal">CVV</p>
                <p class="p-modal-input">{typeof card_virtual == "undefined" ? card.cvv : card_virtual.cvv}</p>
            </div>
        </div>
        <button
        class="btn-primary"
        on:click={() => {
            modal_visu_toggle = false;
        }}>Ok</button>
    </Modal>

    <!-- Modal Excluir -->
    <Modal modal_toggle={modal_delete_toggle}>
        <img src="./src/assets/icons/delete_card.svg" alt="new_card" />
        <p class="text-modal">Cartão excluído com suceso!</p>
        <button
        class="btn-primary"
        on:click={() => {
            modal_delete_toggle = false;
        }}>ok</button
        >
    </Modal>
{/if}

<style lang="scss">
    .card-hover{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 34.6rem;
        padding: 55px 80px;
        border-radius: 2rem;
        gap: .8rem;
        background: transparent;
        transition: .04s all ease-out;

        button{
            border-radius: 1rem;
            border: none;
            z-index: 1;
            padding: .8rem 2.4rem;
            font-size: 1.4rem;
            color: var(--c-white);
            background-color: var(--c-ebony-clay);
            display: none;
            cursor: pointer;

            &:hover, 
            &:focus{
                background-color: var(--c-haiti);
            }
        }

        &:hover{
            background: rgba(29, 29, 65, 0.40);
            button{
                display: block;
            }           
        }
    }
    
    .btn-primary {
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
        &:focus {
            background-color: var(--c-palatinate-blue);
            transform: scale(1.02);
            font-weight: var(--s-semi-bold);
        }
    }

    .text-modal {
        font-size: 2rem;
        font-weight: var(--b-bold);
        line-height: 120%;
        color: var(--c-white);
    }

    div{
        gap: .8rem;
    }

    .p-modal{
        color: var(--c-wild-blue-yonder);
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 120%;
    }

    .p-modal-input{
        padding: 1.3rem;
        border-radius: 1rem;
        background: var(--c-ebony-clay);
        color: var(--c-wild-blue-yonder);
        width: 100%;
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 120%;
    }
</style>