const certifiedUser = '/certification/certifieduser/responsive-web-design';

describe('A certification,', function () {
  before(() => {
    cy.task('seed', ['certified-user']);
  });

  describe('while viewing your own,', function () {
    beforeEach(() => {
      cy.login();
    });
    it('should render a LinkedIn button', function () {
      cy.visit(certifiedUser);
      cy.contains('Add this certification to my LinkedIn profile')
        .should('have.attr', 'href')
        .and(
          'match',
          // eslint-disable-next-line max-len
          /https:\/\/www\.linkedin\.com\/profile\/add\?startTask=CERTIFICATION_NAME&name=Responsive%20Web%20Design&organizationId=4831032&issueYear=\d\d\d\d&issueMonth=\d\d?&certUrl=https:\/\/freecodecamp\.org\/certification\/certifieduser\/responsive-web-design/
        );
    });

    it('should render a Twitter button', function () {
      cy.visit(certifiedUser);
      cy.contains('Share this certification on Twitter').should(
        'have.attr',
        'href',
        'https://twitter.com/intent/tweet?text=I just earned the Responsive%20Web%20Design certification @freeCodeCamp! Check it out here: https://freecodecamp.org/certification/certifieduser/responsive-web-design'
      );
    });

    it('should be issued with the submission date', () => {
      cy.visit(certifiedUser);
      const issued = `Developer Certification on August 3, 2018`;
      cy.get('[data-cy=issue-date]').should('include.text', issued);
    });

    it('should be issued with the number of hours undertaken', () => {
      cy.visit(certifiedUser);
      const hours = '300 hours';
      cy.get('.information-container').should('include.text', hours);
    });
  });

  describe("while viewing someone else's,", function () {
    before(() => {
      cy.visit(certifiedUser);
    });

    it('should display certificate', function () {
      cy.contains('successfully completed').should('exist');
      cy.contains('Responsive Web Design').should('exist');
    });

    it('should not render a LinkedIn button', function () {
      cy.contains('Add this certification to my LinkedIn profile').should(
        'not.exist'
      );
    });

    it('should not render a Twitter button', function () {
      cy.contains('Share this certification on Twitter').should('not.exist');
    });
  });
});
