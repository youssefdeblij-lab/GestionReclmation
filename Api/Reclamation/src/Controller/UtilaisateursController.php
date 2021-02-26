<?php

namespace App\Controller;

use App\Entity\Utilaisateurs;
use App\Form\UtilaisateursType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/utilaisateurs')]
class UtilaisateursController extends AbstractController
{
    #[Route('/', name: 'utilaisateurs_index', methods: ['GET'])]
    public function index(): Response
    {
        $utilaisateurs = $this->getDoctrine()
            ->getRepository(Utilaisateurs::class)
            ->findAll();

        return $this->render('utilaisateurs/index.html.twig', [
            'utilaisateurs' => $utilaisateurs,
        ]);
    }

    #[Route('/new', name: 'utilaisateurs_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $utilaisateur = new Utilaisateurs();
        $form = $this->createForm(UtilaisateursType::class, $utilaisateur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($utilaisateur);
            $entityManager->flush();

            return $this->redirectToRoute('utilaisateurs_index');
        }

        return $this->render('utilaisateurs/new.html.twig', [
            'utilaisateur' => $utilaisateur,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'utilaisateurs_show', methods: ['GET'])]
    public function show(Utilaisateurs $utilaisateur): Response
    {
        return $this->render('utilaisateurs/show.html.twig', [
            'utilaisateur' => $utilaisateur,
        ]);
    }

    #[Route('/{id}/edit', name: 'utilaisateurs_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Utilaisateurs $utilaisateur): Response
    {
        $form = $this->createForm(UtilaisateursType::class, $utilaisateur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('utilaisateurs_index');
        }

        return $this->render('utilaisateurs/edit.html.twig', [
            'utilaisateur' => $utilaisateur,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'utilaisateurs_delete', methods: ['DELETE'])]
    public function delete(Request $request, Utilaisateurs $utilaisateur): Response
    {
        if ($this->isCsrfTokenValid('delete'.$utilaisateur->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($utilaisateur);
            $entityManager->flush();
        }

        return $this->redirectToRoute('utilaisateurs_index');
    }
	
	/**
     * @Route("/checkpass", name="checkpass", methods={"POST"})
     */
    public function checkpass(Request $request): Response
    {
		
	   $repository = $this->getDoctrine()->getRepository(Utilaisateurs::class);
       $dataReq = json_decode($request->getContent(), true);
	   $addOnPass = "fb";
       $userName  = $dataReq[0]["Nom"];
       $passUser  = $addOnPass.$dataReq[0]["Password"];
	   $check = "false";
	   $role ="None";
	   $id = 0;
	   
	   // or find by name and price
	   $userFound = $repository->findOneBy([
		'username' => $userName,
		'password' => $passUser,
	  ]);
	 
	  if (!$userFound) $check = "false";
	  else{ $check = "true";      
		 // var_dump($userFound ); 
		 $role = $userFound->getRole(); 
		 $id = $userFound->getId(); 
		 $name = $userFound->getNom(); 
	 }
	  
	  
	   
       $t = '{"Response" : "'.$check.'","role" :"'.$role.'","id":"'.$id.'", "Nom" :"'.$name.'" }';
	   $response = new Response();
		
		$response->setContent($t);
		 $response->headers->set('Content-Type', 'application/json');	
		 $response->headers->set('Access-Control-Allow-Origin', '*');
		 $response->send();
		 
        return new Response(); 
    }
}
