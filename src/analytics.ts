import * as $ from 'jquery';

function clickAnalytics(): object {
    let counter: number = 0;
    let isDeleted: boolean = false;

    let clickHandler = (): number => counter += 1;

    $(document).on('click', clickHandler);

    return {
        delete() {
            $(document).off('click', clickHandler),
            isDeleted = true;
        },
        getCounter() {
            return (!isDeleted) ? counter : 'COUNTER_DELETED';
        },
        reset() {
            counter = 0;

            return true;
        }
    }
}

export default clickAnalytics;