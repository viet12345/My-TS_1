/// <reference types="cypress" />

describe('template spec', () => {
    it('passes', () => {
        //
        cy.visit('https://book.madecomfy.com/')
        cy.get('button').contains('Search').click()
        //
        // cy.get("div[data-test = 'property-list-search-results']").then(
        //     ($list_room) => {
        //         cy.wrap($list_room)
        //             .find('a')
        //             .first()
        //             .invoke('attr', 'href')
        //             .then((href) => {
        //                 // Check if href is defined before visiting
        //                 if (href) {
        //                     cy.visit('https://book.madecomfy.com' + href)
        //                         .url()
        //                         .should('include', href)
        //                 } else {
        //                     throw new Error('No href attribute found')
        //                 }
        //             })

        cy.get("div[data-test='property-list-search-results']")
            .find('a')
            .each(($link) => {
                const href = $link.attr('href')
                if (href) {
                    cy.visit('https://book.madecomfy.com' + href).then(() => {
                        cy.get('button')
                            .contains('Book Now')
                            .then((button) => {
                                if (button.is(':enabled')) {
                                    cy.log(
                                        'Tìm thấy button Book now không thể click tại ' +
                                            href
                                    )
                                } else {
                                    cy.log('FAIL')
                                }
                            })
                    })
                }
            })
    })
})
