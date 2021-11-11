describe('sharedui: ServiceComponent component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=servicecomponent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ServiceComponent!');
    });
});
